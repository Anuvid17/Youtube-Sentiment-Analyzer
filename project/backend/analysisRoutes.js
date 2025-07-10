import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validSaveChoices = new Set(['1', '2', '3', '4', '5']);
const validWordcloudSentiments = new Set(['1', '2', '3']); // 1:positive, 2:negative, 3:all

router.post('/', (req, res) => {
  console.log('Received request body:', req.body);
  const { url, save_choice, wordcloud_sentiment } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing URL.' });
  }

  if (save_choice && !validSaveChoices.has(save_choice)) {
    return res.status(400).json({ error: 'Invalid save_choice. Must be one of 1,2,3,4,5.' });
  }

  if (wordcloud_sentiment && !validWordcloudSentiments.has(wordcloud_sentiment)) {
    return res.status(400).json({ error: 'Invalid wordcloud_sentiment. Must be one of 1,2,3.' });
  }

  const pythonScriptPath = path.resolve(__dirname, '../ml/main.py');
  const pythonExec = 'python';  // Use python3 to be safe; change if needed

  // Provide default save_choice and wordcloud_sentiment if missing
  const args = [pythonScriptPath, url];
  args.push(save_choice || '5');             // default '5' = exit without saving
  args.push(wordcloud_sentiment || '3');     // default '3' = all sentiments

  console.log('➡️ Running Python script:', pythonExec, args.join(' '));

  const mlDir = path.resolve(__dirname, '../ml');  // cwd set to ml directory

  const pythonProcess = spawn(pythonExec, args, {
    cwd: mlDir,
  });

  let stdout = '';
  let stderr = '';

  pythonProcess.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  pythonProcess.on('error', (err) => {
    console.error('❌ Failed to start Python process:', err);
    return res.status(500).json({ error: 'Failed to start Python process', details: err.message });
  });

  pythonProcess.on('close', (code) => {
    console.log(`✅ Python process exited with code: ${code}`);

    if (stderr) {
      console.error('🐍 Python STDERR:', stderr.slice(0, 500));
    }

    if (code !== 0) {
      return res.status(500).json({
        error: 'Python script failed',
        details: stderr || 'Unknown error',
      });
    }

    try {
      const lines = stdout.trim().split('\n');
      const lastLine = lines[lines.length - 1];

      console.log('📤 Python last line output:', lastLine);

      const result = JSON.parse(lastLine);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      return res.json({ success: true, data: result });
    } catch (err) {
      console.error('❌ Failed to parse Python output:', err.message);
      console.error('📄 Full STDOUT:', stdout.slice(0, 1000));

      return res.status(500).json({
        error: 'Failed to parse Python output. Make sure the last line of the script is a valid JSON string.',
      });
    }
  });

  setTimeout(() => {
    if (!pythonProcess.killed) {
      pythonProcess.kill();
      console.warn('⚠️ Python process was killed due to timeout');
    }
  }, 120000); // kill after 2 minutes
});

export default router;
