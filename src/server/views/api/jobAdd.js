async function handler(req, res) {
  const { queueName, queueHost } = req.params;
  const data = req.body;

  const { Queues } = req.app.locals;

  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).json({ error: 'queue not found' });

  try {
    await Queues.set(queue, data);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
  return res.sendStatus(200);
}

module.exports = handler;