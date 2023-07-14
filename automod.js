const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Setup the auto mod system")
    .addSubcommand(command =>
      command
        .setName("flagged-words")
        .setDescription("Block profanity, sexual content, and slurs")
    )
    .addSubcommand(command =>
      command
        .setName("spam-messages")
        .setDescription("Block messages suspected of spam")
    )
    .addSubcommand(command =>
      command
        .setName("mention-spam")
        .setDescription(
          "Block messages containing a certain amount of messages"
        )
    )
    .addSubcommand(command =>
      command
        .setName("keyword")
        .setDescription("Block a given keyword in the server")
        .addStringOption(option =>
          option
            .setName("word")
            .setDescription("The word you want to block")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const { guild, options } = interaction;
    const sub = options.getSubcommand();

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({
        content: `You can't have perms to setup Automod within this server`,
        ephermal: true,
      });

    switch (sub) {
      case "flagged-words":
        await interaction.reply({ content: `Loading your automod rules...`});
    
    const rule = await guild.autoModerationRules.create({
      name: `Block profanity, sexual content, and slurs by Amaris Unity`,
      creatorID: "1126950415267811388",
      enabled: true,
      eventType: 1,
      triggerType: 4,
      triggerMetadata: 
      {
        presets: [1, 2, 3]
      }, 
      actions: [
        {
            type: 1, 
            metadata: {
                channel: interaction.channel, 
                durationSeconds: 10, 
                customMessage: 'This message was blocked by Amaris Unity Auto Moderation'
            }
        }
      ]
    }).catch(async err => {
        setTimeout(async () => {
            console.log(err)
            await interaction.editReply({content: `${err}`});
        }, 2000)
    })

    setTimeout(async () => {
        if (!rule) return;

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(":white_check_mark: You Autmod rule has been created- all swears will be stopped by Amaris Unity")

        await interaction.editReply({content: ``, embeds: [embed]});
    }, 3000)

    break;

    case 'keyword':

    await interaction.reply({ content: `Loading your automod rules...`});
    const word = options.getString('word');
    
    const rule2 = await guild.autoModerationRules.create({
      name: `Prevent the word ${word} from being used by Amaris Unity`,
      creatorID: "1126950415267811388",
      enabled: true,
      eventType: 1,
      triggerType: 1,
      triggerMetadata: 
      {
        keywordFilter: [`${word}`]
      }, 
      actions: [
        {
            type: 1, 
            metadata: {
                channel: interaction.channel, 
                durationSeconds: 10, 
                customMessage: 'This message was blocked by Amaris Unity Auto Moderation'
            }
        }
      ]
    }).catch(async err => {
        setTimeout(async () => {
            console.log(err)
            await interaction.editReply({content: `${err}`});
        }, 2000)
    })

    setTimeout(async () => {
        if (!rule2) return;

        const embed2 = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(":white_check_mark: You Autmod rule has been created- all messages containing blocked words will be deleted by Amaris Unity")

        await interaction.editReply({content: ``, embeds: [embed2]});
    }, 3000)

    break;

    case 'spam-messages':

    await interaction.reply({ content: `Loading your automod rules...`});
    
    const rule3 = await guild.autoModerationRules.create({
      name: `Prevent spam messages by Amaris Unity`,
      creatorID: "1126950415267811388",
      enabled: true,
      eventType: 1,
      triggerType: 3,
      triggerMetadata: 
      {
        // mentionTotalLimit: number
      }, 
      actions: [
        {
            type: 1, 
            metadata: {
                channel: interaction.channel, 
                durationSeconds: 10, 
                customMessage: 'This message was blocked by Amaris Unity Auto Moderation'
            }
        }
      ]
    }).catch(async err => {
        setTimeout(async () => {
            console.log(err)
            await interaction.editReply({content: `${err}`});
        }, 2000)
    })

    setTimeout(async () => {
        if (!rule3) return;

        const embed3 = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(":white_check_mark: You Autmod rule has been created- all spam messages will be deleted by Amaris Unity")

        await interaction.editReply({content: ``, embeds: [embed3]});
    }, 3000)

    break; 

    case 'mention-spam':
        await interaction.reply({ content: `Loading your automod rules...`});

    
    const rule4 = await guild.autoModerationRules.create({
      name: `Prevent mention by Amaris Unity`,
      creatorID: "1126950415267811388",
      enabled: true,
      eventType: 1,
      triggerType: 5,
      triggerMetadata: 
      {
        mentionTotalLimit: 20
      }, 
      actions: [
        {
            type: 1, 
            metadata: {
                channel: interaction.channel, 
                durationSeconds: 10, 
                customMessage: 'This message was blocked by Amaris Unity Auto Moderation'
            }
        }
      ]
    }).catch(async err => {
        setTimeout(async () => {
            console.log(err)
            await interaction.editReply({content: `${err}`});
        }, 2000)
    })

    setTimeout(async () => {
        if (!rule4) return;

        const embed4 = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(":white_check_mark: You Autmod rule has been created- all mention spam will be stopped by Amaris Unity")

        await interaction.editReply({content: ``, embeds: [embed4]});
    }, 3000)
    }
  },
};
