export async function handleSlackEvents(slackBot) {
  try {
    await slackBot.start();
    console.log('⚡️ Slack Bolt app is running!');

    // Handle messages in specific channels
    slackBot.message(async ({ message, say }) => {
      // Check if message is in allowed channels
      const allowedChannels = (process.env.SLACK_ALLOWED_CHANNELS || '').split(',');
      if (!allowedChannels.includes(message.channel)) return;

      // Check if user is allowed
      const allowedUsers = (process.env.SLACK_ALLOWED_USERS || '').split(',');
      if (!allowedUsers.includes(message.user)) return;

      try {
        // Draft response using OpenAI
        const response = await draftResponse(message.text);
        
        // Send response
        await say({
          text: response,
          thread_ts: message.thread_ts || message.ts
        });
      } catch (error) {
        console.error('Error handling Slack message:', error);
      }
    });
  } catch (error) {
    console.error('Error starting Slack bot:', error);
  }
}