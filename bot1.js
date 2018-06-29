const Discord = require("discord.js");
const client = new Discord.Client({autoreconnect: true});
var fs = require("fs")

var tokens = process.env.TOKEN

var Prefixe = "5239::"
var prefixe = "5239::"
var tracé = ""

var mode = 6

var commandes_perso = ["愤怒的罪恶","Mr. Game","TransiSciences"]

var historique = []
var bloqués = ["450263236743397377","450728497477058590",""]
var serv100 = []
var serv250 = []

var vcs = []
var vcs2 = ["452461579015946240", "452462487636410368", "451768468728053760", "452463406532919297", "452890030667464705", "453615172762861568"]

var début = true
var statusChangé = false

var admins = ["426775253650505729", // Moi.
"440879810118549505", // RPboT
"445157515802443778", // Mon robot, Lulu5239#7781
"446399296221347840", // LarxBot
"428614939008040960", // Lulu5239 - Robot
"292953664492929025", // UnbelievaBoat
]
var bannis_du_vcs = []
var events = {
  userID: [],
  salonID: [],
  action: [],
}

client.on("error", (e) => console.error("\n\n"+e));
client.on("warn", (e) => console.warn("\n\n"+e));

var donnes = {}
var ancien_statut = "online"

client.on('ready', () => {
  console.log("Prêt !");
  client.user.setUsername("Lulu5239")
  client.user.setActivity("Visual Studio Code", "type:PLAYING")
  client.user.setStatus("online")
//client.user.setAvatar("https://cdn.discordapp.com/emojis/453611817269198859.gif?v=1")
  var donnes = {}
});

client.on('message', (msg, mmb) => {

if (donnes[msg.author.id]==undefined) {
  donnes[msg.author.id] = {}
  donnes[msg.author.id].messagesSent = 0
  donnes[msg.author.id].prefixe = Prefixe
}
if (donnes[msg.author.id].prefixe==undefined) {
  donnes[msg.author.id].prefixe = Prefixe
}

if(events.userID.length>0){
  if(events.userID.includes(msg.author.id)) {
    var x = 0
    while (x < events.userID.length) {
      if(msg.author.id == events.userID[x] && msg.channel.id == events.salonID[x]) {
        events.action[x](msg)
        events.userID[x] = "Erreur."
      }
      x++
    }
  }
}
  
if(msg.content.startsWith(prefixe)){
  
  if (msg.content === (prefixe+'ping')) {
    msg.channel.send("Pong. "+(Date.now() - msg.createdTimestamp)+" (En millisecondes.)");
    Log(msg, "ping")
  }

  if (msg.content === (prefixe + 'test')) {
    msg.reply('Test validé.');
    Log(msg, "test")
  }

  if (msg.content === (prefixe + 'aide')) {
    Log(msg, "aide")
    var couleur = couleur_auto(msg)
    var lembed = {
      title: "Aide",
      color: couleur,
      description: `Le préfixe de ce robot est \`${prefixe}\`.`,
      fields: [],
    }
    lembed.fields.push({
      name: "__Fonctions principales__",
      value: "`"+prefixe+"ping` : *Pong !*\n`"+prefixe+"test` : *Test validé.*\n`"+prefixe+"oh mon dieu !` : :grin:\n`"+prefixe+"prévenir` : Prévenez Lulu5239 dans sa console.\n`"+prefixe+"privé` : Envoyez un message privé à Lulu5239.\n`"+prefixe+"f_perso` : Affiche de la pub pour avoir une fonction personnalisée.\n`"+prefixe+"dire` : Le robot répète ce que vous dites.\n`"+prefixe+"crédits` : Affiche les personnes que j'aimerais remercier.\n`"+prefixe+"bulle` : Met votre message dans une bulle.\n`"+prefixe+"edits` : Regarde l'édition de votre message."
    })
    if (msg.guild!=undefined&&(msg.author == "<@426775253650505729>"||msg.guild.member(msg.author).hasPermission("MANAGE_MESSAGES"))) {
      lembed.fields.push({
        name: "__Fonctions pour les modérateurs__",
        value: "Aucune."
      })
    }
    if (msg.author == "<@426775253650505729>") {
      lembed.fields.push({
        value: "`"+prefixe+"off` : Eteint le robot.\n`"+prefixe+"dire` : Répète l'argument.\n`"+prefixe+"eval` : Execute le code.\n`"+prefixe+"status` : Change le status du robot.\n`"+prefixe+"envoi1` : Choisir l'id du salon pour `"+prefixe+"envoi2`.\n`"+prefixe+"envoi2` : Poster un message.\n`"+prefixe+"envoi` : Même chose, mais en meilleur (qui fonctionne).",
        name: "__Lulu5239__",
      })
      lembed.fields.push({
        value: "`"+prefixe+"jeu` : Change le jeu.\n`"+prefixe+"status` : Change le status.",
        name: "__Commandes système__",
      })
      lembed.fields.push({
        value: "Aucune.",
        name: "__Commandes système du jeu__",
      })
    } else {
      lembed.fields.push({
        value: "Vous n'êtes pas Lulu5239.",
        name: "__Lulu5239__",
      })
      
    }
    if(msg.guild!=undefined){
      if(donnes[msg.author.id].messagesSent >= 100 || admins.includes(msg.author.id) || serv100.includes(msg.guild.id)){
        lembed.fields.push({
          name: "__Fonctions pour ceux qui ont postés plus de 100 messages__",
          value: "Aucune."
        })
      }  
      if(donnes[msg.author.id].messagesSent >= 250 || admins.includes(msg.author.id) || serv250.includes(msg.guild.id)){
        lembed.fields.push({
          name: "__Fonctions pour ceux qui ont postés plus de 250 messages__",
          value: "`"+prefixe+"aide` : Une plus grosse aide."
        })
      } 
    } 
    msg.channel.send({embed: lembed})
    msg.react("✅")
  }

  if (msg.content === (prefixe + 'off') && msg.author == "<@426775253650505729>") {
    msg.react("✅")
    off(msg)
    Log(msg, "off")
  }
  
  if (msg.content.startsWith(prefixe + 'eval') && msg.author == "<@426775253650505729>") {
    eval(msg.content.replace(prefixe+"eval ",""))
    Log(msg, "eval")
  }

  if (msg.content === (prefixe + 'off') && msg.author != "<@426775253650505729>") {
    msg.channel.send(msg.author+"\nTu croyais avoir le droit d'éteintre le robot ?\nLulu5239 a été prévenu...");
    msg.react("❌")
    console.warn(msg.author+" a essayé d'éteindre le robot.")
    Log(msg, "off")
  }

  if (msg.content === (prefixe + 'help')) {
    msg.channel.send("Vas voir `5239:aide`.");
    msg.react("❌")
    Log(msg, "help")
  }

  if (msg.content.startsWith(prefixe + "liste")) {
    Log(msg, "liste")
    let sender = msg.author.username;
    let server = msg.guild.name;
    let ginfoEmbed = new Discord.RichEmbed()
        .setColor('#00FFE8')
        .addField("Liste des serveurs :", ""+client.guilds.map(g => g.name+" ("+g.id+")").join("\n"))

    msg.channel.send(ginfoEmbed)
  }

  if (msg.content === (prefixe + 'oh mon dieu !')) {
    msg.react("😁")
    Log(msg, "oh mon dieu !")
  }

  if (msg.content === (prefixe + 'crédits')) {
    Log(msg, "crédits")
    msg.channel.send({embed:{
      title: "**__Crédits__**",
      description: "Je tiens à remercier :",
      fields: [{
        name: "TransiSciences#6105",
        value: "Pour les quelques fonctions qu'il m'a donné."
      }],
      footer: {
        text: "Robot créé par Lulu5239#8623."
      },
      color: 255*255
    }})
  }

  if (commandes_perso.includes(msg.content.replace(prefixe,""))) {
    msg.channel.send({embed:{
      title: "__Commande personnalisée__",
      color: 255*255*255,
    }})
    Log(msg, "<fonction personnalisée>")
  }

  if (msg.content === (prefixe + 'test emoji') && client.user.tag == "Lulu5239#7781") {
    msg.reply("<:Rouge:446008626549751819>")
    Log(msg, "test emoji")
  }

  if (msg.content === (prefixe + 'test user')) {
    msg.channel.send(" -> " + msg.author)
    Log(msg, "test user")
  }

  if (msg.content === (prefixe + 'test user')) {
    msg.channel.send(" -> " + msg.author)
    Log(msg, "test user")
  }

  if (msg.content.startsWith(prefixe + 'js')) {
    Log(msg, "js")
    if(msg.content.split(" ").length > 0 && admins.includes(msg.author.id)){
      var q = Number(msg.content.split(" ")[1])
    } else {
      var q = Math.floor(Math.random()*5)
    }
    if (q == 0) {
      msg.channel.send({embed:{
        title: ":one:",
        description: emoji("Lulu5239")+emoji("#F00")+"| Combien existe-il de type de `\"` pouvant contenir du texte ?",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="4") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "Il y a : \", ', \\` et /."
          }})
        }
      })
    } else if (q == 1) {
      msg.channel.send({embed:{
        title: ":two:",
        description: emoji("Lulu5239")+emoji("#0F0")+"| Combien faut-il de `\"` autour d'un texte ?",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="2") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "Il en faut 2."
          }})
        }
      })
    } else if (q == 2) {
      msg.channel.send({embed:{
        title: ":three:",
        description: emoji("Lulu5239")+emoji("#F0F")+"| Que faut-il devant un `\"` pour le mettre entre 2 autres `\"` ?",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="\\") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "C'est un `\\`."
          }})
        }
      })
    } else if (q == 3) {
      msg.channel.send({embed:{
        title: ":four:",
        description: emoji("Lulu5239")+emoji("#FF0")+"| Quand on utilise des \\` pour entourer un texte, on utilise...\n*Utilisez `var` pour la variable et ne mettez pas d'espaces.*",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="${var}") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "${var}"
          }})
        }
      })
    } else if (q == 4) {
      msg.channel.send({embed:{
        title: ":five:",
        description: emoji("Lulu5239")+emoji("#0FF")+"| Comment s'appelle la chose où on peux écrire du Javascript directement évalué ?\n*Sans déterminant, avec majuscule.*",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="Console") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "Une console."
          }})
        }
      })
    } else if (q == 5) {
      msg.channel.send({embed:{
        title: ":one:",
        description: emoji("Lulu5239")+emoji("#F00")+"| Combien existe-il de type de `\"` pouvant contenir du texte ?",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="4") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "Il y a : \", ', \\` et /."
          }})
        }
      })
    } else if (q == 6) {
      msg.channel.send({embed:{
        title: ":one:",
        description: emoji("Lulu5239")+emoji("#F00")+"| Combien existe-il de type de `\"` pouvant contenir du texte ?",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="4") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "Il y a : \", ', \\` et /."
          }})
        }
      })
    } else if (q == 7) {
      msg.channel.send({embed:{
        title: ":one:",
        description: emoji("Lulu5239")+emoji("#F00")+"| Combien existe-il de type de `\"` pouvant contenir du texte ?",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="4") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "Il y a : \", ', \\` et /."
          }})
        }
      })
    } else if (q == 8) {
      msg.channel.send({embed:{
        title: ":one:",
        description: emoji("Lulu5239")+emoji("#F00")+"| Combien existe-il de type de `\"` pouvant contenir du texte ?",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="4") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "Il y a : \", ', \\` et /."
          }})
        }
      })
    } else if (q == 9) {
      msg.channel.send({embed:{
        title: ":one:",
        description: emoji("Lulu5239")+emoji("#F00")+"| Combien existe-il de type de `\"` pouvant contenir du texte ?",
        color: 255
      }})
      events.userID.push(msg.author.id)
      events.salonID.push(msg.channel.id)
      events.action.push(function(message){
        if(message.content=="4") {
          message.channel.send({embed:{
            color: 255*255,
            title: "Bravo !"
          }})
        } else {
          message.channel.send({embed:{
            color: 255*255*255,
            title: "Perdu !",
            description: "Il y a : \", ', \\` et /."
          }})
        }
      })
    }
  }

  if (msg.content === (prefixe + 'rôles') && admins.includes(msg.author.id)) {
    y="";x=0;while (x != msg.guild.roles.length){y += msg.guild.roles[x]+"\n";x++}
    msg.channel.send(" -> " + y)
    Log(msg, "rôles")
  }

  if (msg.content === (prefixe + 'admin') && admins.includes(msg.author.id)) {
    setTimeout("msg.delete()",1000);
    msg.channel.send("C'est bon !")
    Log(msg, "admin")
  }

  if (msg.content == (prefixe+"f_perso")) {
    Log(msg, "f_perso")
    msg.channel.send({embed:{color: 255, description: "Tu en veux une ?\nDemande à Lulu5239 !", title: "__Fonctions personnalisées__", footer: { text: "C'est gratuit : il faut juste que l'on soit un peu ami." } }}); msg.delete()
  }

  if (msg.content === (prefixe + 'test embed')) {
    Log(msg, "test embed")
    msg.channel.send({embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "This is an embed",
      url: "http://google.com",
      description: "This is a test embed to showcase what they look like and what they can do.",
      fields: [{
          name: "Fields",
          value: "They can have different fields with small headlines."
        },
        {
          name: "Masked links",
          value: "You can put [masked links](http://google.com) inside of rich embeds."
        },
        {
          name: "Markdown",
          value: "You can put all the *usual* **__Markdown__** inside of them."
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Example"
      }
    }
  });
  }

  if (msg.content == prefixe+"salons" && couleur_auto(msg) == 255*255) {
    msg.channel.send(""+msg.guild.channels.map(g => g+" ("+g.id+")").join("\n"))
    Log(msg, "salons")
  }

  if (msg.content == prefixe+"membres" && couleur_auto(msg) == 255*255) {
    msg.channel.send(""+msg.guild.presences.map(g => "<@"+g+"> ("+g.status+")").join("\n"))
    Log(msg, "salons")
  }

  if (msg.content.startsWith(prefixe + 'test arg')) {
    Log(msg, "test arg")
    msg.channel.send(" Argument : `" + msg.content.replace(prefixe+"test arg ","") + "`")
  }
  if (msg.content.startsWith(prefixe + 'houra')) {
    Log(msg, "houra")
    msg.react("🎉")
  }
  if (msg.content.startsWith(prefixe + 'bloquer') && admins.includes(msg.author.id)) {
    Log(msg, "bloquer")
    var larg = msg.content.replace(prefixe+"bloquer ", "")
    if(larg==prefixe+"bloquer") {
      if (bloqués.includes(msg.channel.id)) {
        var x = "["
        var y = 0
        while (y != bloqués.length) {
          x = x + "\""+bloqués[y]+"\","
          y++
        }
        x += "]"
        x = x.replace("\""+msg.channel.id+"\",", "").replace("\",]","\"]")
        bloqués = eval(x)
        setTimeout(function(){msg.channel.send("Ce salon est débloqué.")}, 250)
      } else {
        msg.channel.send("Ce salon est bloqué.")
        setTimeout(function(){bloqués.push(msg.channel.id)}, 250)
      }
    } else {
      if (bloqués.includes(larg)) {
        var x = "["
        var y = 0
        while (y != bloqués.length) {
          x = x + "\""+bloqués[y]+"\","
          y++
        }
        x += "]"
        x = x.replace("\""+larg+"\",", "").replace("\",]","\"]")
        bloqués = eval(x)
        setTimeout(function(){msg.channel.send("Cet utilisateur est débloqué.")}, 250)
      } else {
        msg.channel.send("Cet utilisateur est bloqué.")
        setTimeout(function(){bloqués.push(larg)}, 250)
      }
    }
  }

  if (msg.content.startsWith(prefixe + 'membres')) {
    Log(msg, "membres")
    msg.channel.send({embed:{title: "Nombre de personnes sur le serveur : "+msg.guild.memberCount, color: 255}})
  }

  if (msg.content.startsWith(prefixe + 'préfixe ')) {
    Log(msg, "préfixe")
    msg.channel.send({embed:{title: emoji("V")}})
    donnes[msg.author.id].prefixe = msg.content.replace(prefixe+"préfixe ", "")
  }

  if (msg.content.startsWith(prefixe + 'prévenir')) {
    Log(msg, "prévenir")
    if (msg.content.replace(prefixe + "prévenir ", "") == msg.content) {
      msg.channel.send("Lulu5239 a été prévenu dans sa console.")
      console.log("Quelqu'un vous a alerté.")
    }
    if (msg.content.replace(prefixe + "prévenir ", "") != msg.content) {
      msg.channel.send("Vous envoyez à Lulu5239 : "+msg.content.replace(prefixe + "prévenir ", ""))
      console.log(msg.content.replace(prefixe+"prévenir ", ""))
    }
  }

  if (msg.content.startsWith(prefixe+"edits")) {
    Log(msg, "edits")
    var avant = msg.channel.send({embed:{
      title: "Editez votre message.",
      description: "Vous avez 5 secondes.",
      color: 255*255*255
    }})
    setTimeout(function(){
      if(msg._edits.length>0){
        msg.channel.send({embed:{
          title: "Avant",
          description: ""+msg._edits[0],
          color: 255
        }})
        msg.channel.send({embed:{
          title: "Après",
          description: ""+msg.content,
          color: 255*255
        }})
      } else {
        msg.channel.send({embed:{
          title: "Erreur",
          description: "Vous n'avez pas édité votre message.",
          color: 0
        }})
      }
    }, 5000)
  }

  if (msg.content.startsWith(prefixe + 'tracer') && msg.author == "<@426775253650505729>") {
    Log(msg, "tracer")
    if (msg.content.replace(prefixe + "tracer ", "") == msg.content) {
      msg.channel.send({embed:{
        color: 16711680,
        title: ":x: | Aucun argument fourni.",
        footer: {
          text: "Ajoutez un argument.",
          icon_url: client.user.avatarURL,
        }
      }})
    }
    if (msg.content.replace(prefixe + "tracer ", "") != msg.content) {
      msg.reply("...")
    }
  }

  if (msg.content.startsWith(prefixe + 'x ') && (msg.author == "<@426775253650505729>"||msg.guild.member(msg.author).hasPermission("MANAGE_MESSAGES"))) {
    msg.channel.bulkDelete(Number(msg.content.replace(prefixe+"x ",""))+1)
    Log(msg, "x")
  }

  if (msg.content.startsWith(prefixe + '...x') && (msg.author == "<@426775253650505729>"||msg.guild.member(msg.author).hasPermission("MANAGE_MESSAGES"))) {
    var x = msg.content.split(" ")
    setTimeout(function(){msg.channel.bulkDelete(Number(x[1])+2)},Number(x[2])*1000)
    msg.channel.send({embed:{
      title:":white_check_mark: | "+x[1]+" message(s) seront supprimés dans "+x[2]+" seconde(s)."
    }})
    Log(msg, "...x")
  }

  if (msg.content.startsWith(prefixe + 'espion') && msg.author == "<@426775253650505729>") {
    Log(msg, "espion")
    var x = msg.content.replace(prefixe+"espion ","")
    if (x=="h") {
      if (historique.length<11){
        var y=""; var z=0;while (z != historique.length){y += "Message de "+historique[z].author+" posté dans "+historique[z].channel+" :\n"+historique[z].content+"\n\n";z++}
        msg.channel.send({embed:{
          title: "Historique des messages ( "+historique.length+" messages )",
          description: y,
          color: 255,
        }})
      } else {
        var y=""; var z=historique.length-10;while (z != historique.length){y += "Message de "+historique[z].author+" posté dans "+historique[z].channel+" :\n"+historique[z].content+"\n\n";z++}
        msg.channel.send({embed:{
          title: "Historique des messages ( "+historique.length+" messages / affichés : 10 derniers messages )",
          description: y,
          color: 255,
        }})
      }
    } else if (x.length>17) {
      msg.channel.send({embed:{
        title: ":white_check_mark: | Espionnage commencé.",
        color: 255*255
      }})
      tracé = x
    } else if (x=="x") {
      msg.channel.send({embed:{
        title: ":white_check_mark: | Espionnage terminé.",
        color: 255*255
      }})
      tracé = ""
    } else if (x=="hx") {
      msg.channel.send({embed:{
        title: ":white_check_mark: | Historique supprimé.",
        color: 255*255
      }})
      historique = []
    } else {
      msg.channel.send({embed:{
        title: "Panneau de contrôle des fonctions d'espionnage",
        color: 255*255,
        fields: [{
          name: "`"+prefixe+"espion h`",
          value: "Afficher l'historique des messages.",
        },{
          name: "`"+prefixe+"espion 1122334455667788`",
          value: "Espionnez quelqu'un avec son ID.",
        },{
          name: "`"+prefixe+"espion x`",
          value: "Stoppe l'espionnage.",
        },{
          name: "`"+prefixe+"espion`",
          value: "Affiche ce message.",
        },{
          name: "`"+prefixe+"espion hx`",
          value: "Supprime l'historique."
        }],
      }})
    }
  }

  if (msg.content.startsWith(prefixe + 'nom') && msg.author == "<@426775253650505729>") {
    msg.channel.send("Nouveau nom : "+msg.content.replace(prefixe + "nom ", ""))
    client.user.setUsername(msg.content.replace(prefixe + "nom ", ""))
    Log(msg, "nom")
  }

  if (msg.content.startsWith(prefixe + 'jeu') && msg.author == "<@426775253650505729>") {
    msg.channel.send("Nouveau jeu : "+msg.content.replace(prefixe + "jeu ", ""))
    client.user.setActivity(msg.content.replace(prefixe + "jeu ", ""),"PLAYING")
    Log(msg, "jeu")
  }

  if (msg.content.startsWith(prefixe + 'emoji') && msg.author == "<@426775253650505729>") {
    msg.channel.send(emoji(msg.content.replace(prefixe + "emoji ", "")))
    Log(msg, "emoji")
  }

  if (msg.content.startsWith(prefixe + 'embed') && admins.includes(msg.author.id)) {
    Log(msg, "embed")
    msg.delete()
    var liste = msg.content.split("\n")
    liste[0] = liste[0].replace(prefixe+"embed ").replace("undefined", "")
    if (liste.length==1) {
      msg.channel.send({embed:{
        title: liste[0],
        color: 255*255,
      }})
    } else if (liste.length==2) {
      msg.channel.send({embed:{
        title: liste[0],
        color: eval(liste[1]),
      }})
    } else if (liste.length==3) {
      msg.channel.send({embed:{
        title: liste[0],
        color: eval(liste[1]),
        description: liste[2]
      }})
    } else {
      var lembed = {
        title: liste[0],
        color: eval(liste[1]),
        description: liste[2],
        fields: [],
      }
      var x = 3
      while(liste.length!=x){
        lembed.fields.push({name: liste[x], value: liste[x+1]})
        x++
        x++
      }
      msg.channel.send({embed:lembed})
    }
  }

  if (msg.content.startsWith(prefixe + 'status') && msg.author == "<@426775253650505729>") {
    Log(msg, "status")
    if(msg.content.replace(prefixe + "status ", "")=="online"||msg.content.replace(prefixe + "status ", "")=="idle"||msg.content.replace(prefixe + "status ", "")=="dnd"||msg.content.replace(prefixe + "status ", "")=="invisible") {
      statusChangé = true
      if (msg.content===prefixe+"status online") {
        msg.channel.send({embed:{
          title: ":white_check_mark:",
          description: "Nouveau status : "+msg.content.replace(prefixe + "status ", ""),
          color: 255*255,
        }})
      } else if (msg.content===prefixe+"status idle") {
        msg.channel.send({embed:{
          title: ":white_check_mark:",
          description: "Nouveau status : "+msg.content.replace(prefixe + "status ", ""),
          color: 16776960,
        }})
      } else if (msg.content===prefixe+"status dnd") {
        msg.channel.send({embed:{
          title: ":white_check_mark:",
          description: "Nouveau status : "+msg.content.replace(prefixe + "status ", ""),
          color: 16711680,
        }})
      } else {
        msg.channel.send({embed:{
          title: ":white_check_mark:",
          description: "Nouveau status : "+msg.content.replace(prefixe + "status ", ""),
        }})
      } // Rouge : 16711680
      client.user.setStatus(msg.content.replace(prefixe + "status ", ""))
    } else {
      msg.channel.send({embed:{
        title: "Argument non-répertorié.",
        fields:[{
          name: "online",
          value: "En ligne."
        },{
          name: "idle",
          value: "Inactif."
        },{
          name: "dnd",
          value: "Ne pas déranger."
        },{
          name: "invisible",
          value: "Invisible."
        }],
        color: 16711680,
      }})
    }
  }

  if (msg.content.startsWith(prefixe + 'spam') && msg.author == "<@426775253650505729>") {
    Log(msg, "spam")
    var args = msg.content.split(" ")
    var larg = Number(args[1])
    var x = 0
    while(x!=larg){
      msg.channel.send(args[2])
      x++
    }
  }

  if (msg.content == prefixe+"gif" && msg.guild != undefined && (donnes[msg.author.id].messagesSent >= 250 || admins.includes(msg.author.id) || serv250.includes(msg.guild.id))) {
    msg.channel.send(emoji("Lulu5239"))
    Log(msg, "gif")
  }

  if (msg.content.startsWith(prefixe + 'vcs ') && msg.author == "<@426775253650505729>") {
    Log(msg, "vcs")
    if (msg.content.replace(prefixe+"vcs ")==msg.content) {
      vcs.push(msg.channel.id)
    } else {
      vcs.push(msg.content.replace(prefixe+"vcs"))
    }
    if (vcs.length==1) {
      msg.channel.send("Bien !\nChoisis au moins un autre salon.")
    } else {
      msg.channel.send("Bien !\nLe VCS est opérationnel !")
    }
  }

  if (msg.content.startsWith(prefixe+"xvcs ") && admins.includes(msg.author.id) ) {
    Log(msg, "xvcs")
    msg.channel.send({embed:{
      title: ":white_check_mark: | Réinitialisé.",
      color: 255*255
    }})
    vcs = []
  }

  if (msg.content.startsWith(prefixe + 'vcs2 ') && msg.author == "<@426775253650505729>") {
    Log(msg, "vcs2")
    if (msg.content.replace(prefixe+"vcs2 ")==msg.content) {
      vcs2.push(msg.channel.id)
    } else {
      vcs2.push(msg.content.replace(prefixe+"vcs2"))
    }
    if (vcs2.length==1) {
      msg.channel.send("Bien !\nChoisis au moins un autre salon.")
    } else {
      msg.channel.send("Bien !\nLe VCS est opérationnel !")
    }
  }

  if (msg.content.startsWith(prefixe+"xvcs2 ") && admins.includes(msg.author.id) ) {
    Log(msg, "xvcs2")
    msg.channel.send({embed:{
      title: ":white_check_mark: | Réinitialisé.",
      color: 255*255
    }})
    vcs2 = []
  }

  if(msg.content.startsWith(prefixe+"code") && admins.includes(msg.author.id)) {
    msg.channel.send("Quel est le code ?")
    events.userID.push(msg.author.id)
    events.salonID.push(msg.channel.id)
    events.action.push(function(message){
      if(message.content=="5239"){
        message.channel.send("Bravo !")
      } else {
        message.channel.send("Perdu... (5239)")
      }
    })
  }

  if (msg.content.startsWith(prefixe + 'dire') && admins.includes(msg.author.id)) {
    Log(msg, "dire")
    msg.channel.send(msg.content.replace(prefixe + "dire ", ""))
    msg.delete()
  }

  if (msg.content.startsWith(prefixe + 'dire') && admins.includes(msg.author.id) == false) {
    msg.channel.send("<@"+msg.author.id+"> a posté :\n"+msg.content.replace(prefixe + "dire ", ""))
    Log(msg, "dire")
  }

  if (msg.content.startsWith(prefixe + 'reacts') && msg.author == "<@426775253650505729>") {
    msg.channel.send(msg.reactions)
    Log(msg, "reacts")
  }

  if (msg.content.startsWith(prefixe + 'eval') && msg.author == "<@426775253650505729>") {
    eval(msg.content.replace(prefixe+"eval ",""))
    Log(msg, "eval")
  }
  if (msg.content.startsWith(prefixe + 'react') && msg.author == "<@426775253650505729>") {
    msg.react(msg.content.replace(prefixe + "react ", ""))
    Log(msg, "react")
  }
  if (msg.content.startsWith(prefixe + 'envoi1') && msg.author == "<@426775253650505729>") {
    var envoiID = msg.content.replace(prefixe + "envoi1 ", "")
    Log(msg, "envoi1")
  }
  if (msg.content.startsWith(prefixe + 'bulle') && msg.author != "<@426775253650505729>") {
    Log(msg, "envoi2")
    msg.channel.send({embed:{
      title: msg.content.replace(prefixe + "bulle ", ""),
      footer: {
        text: "Message posté par "+msg.author+"."
      },
      color: 255,
    }})
    msg.delete()
  }
  if (msg.content.startsWith(prefixe + 'bulle') && msg.author == "<@426775253650505729>") {
    msg.channel.send({embed:{
      title: msg.content.replace(prefixe + "bulle ", ""),
      color: 255*255,
    }})
    msg.delete()
  }
  if (msg.content.startsWith(prefixe + 'envoi2') && msg.author == "<@426775253650505729>") {
    msg.guild.channels.get(envoiID).send(msg.content.replace(prefixe + "envoi2 ", ""))
    Log(msg, "envoi2")
  }
  if (msg.content.startsWith(prefixe + 'envoi') && msg.author == "<@426775253650505729>") {
    Log(msg, "envoi")
    var envoiID = msg.content.charAt(prefixe.length+6)+msg.content.charAt(prefixe.length+7)+msg.content.charAt(prefixe.length+8)+msg.content.charAt(prefixe.length+9)+msg.content.charAt(prefixe.length+10)+msg.content.charAt(prefixe.length+11)+msg.content.charAt(prefixe.length+12)+msg.content.charAt(prefixe.length+13)+msg.content.charAt(prefixe.length+14)+msg.content.charAt(prefixe.length+15)+msg.content.charAt(prefixe.length+16)+msg.content.charAt(prefixe.length+17)+msg.content.charAt(prefixe.length+18)+msg.content.charAt(prefixe.length+19)+msg.content.charAt(prefixe.length+20)+msg.content.charAt(prefixe.length+21)+msg.content.charAt(prefixe.length+22)+msg.content.charAt(prefixe.length+23)
    msg.channel.send({embed:{
      title: ":white_check_mark: | Envoyé.",
      color: 255*255,
    }})
    .then(message => {
      var log = client.channels.findAll('id', envoiID);
      log.forEach(channel => {
          channel.send(msg.content.replace(prefixe + "envoi " + envoiID + " ", ""))
      })
    });
  }
  if (msg.content.startsWith(prefixe + 'privé')) {
    Log(msg, "privé")
    if (true){
      msg.channel.send({embed:{
        title: ":white_check_mark: | Envoyé.",
        color: 255*255,
      }})
      .then(message => {
        var log = client.channels.findAll('id', '441238995721125888');
        log.forEach(channel => {
            channel.send("<@426775253650505729>, tu as reçu un message de <@"+msg.author.id+"> du salon <#"+msg.channel.id+"> :\n"+msg.content.replace(prefixe + "privé ", ""))
        })
      });
    } else {
      msg.channel.send({embed:{
        title:":x: | Erreur",
        description:"Cette commande ne fonctionne que dans <#441168868657070081>.",
        color:16711680,
      }})
    }
  }
  if (msg.content === prefixe + 'reload'){
    Log(msg, "reload")
    if (msg.author == "<@426775253650505729>") {
      msg.reply('arrêt en cours...')
      client.destroy;
      msg.react("✅")
    }
  }

  if(msg.content==prefixe+"perms"&&admins.includes(msg.author.id)) {
    if( msg.guild.member(client.user).hasPermission("ADMINISTRATOR") ) { msg.channel.send( emoji("V") + " | Administrateur" ) } else { msg.channel.send( emoji("X") + " | Administrateur" ) }; setTimeout(function(){msg.channel.bulkDelete(2)}, 1000)
  }

  if(msg.content.startsWith(prefixe+"roles") && admins.includes(msg.author.id)){
    Log(msg, "roles")
    msg.channel.send(msg.member.roles.array())
    console.log(msg.member.roles)
  }

  if (msg.content.startsWith(prefixe + '+role') && admins.includes(msg.author.id)) {
    Log(msg, "+role")
    let sender = msg.author.username;
    let server = msg.guild.name;
    if (msg.content.substr(9).length === 0) return;
    if (!msg.guild.member(client.user).hasPermission("MANAGE_ROLES")) return msg.channel.send(":x: | Je n'ai pas la permission `MANAGE_ROLES`")
    let addRole = msg.mentions.roles.first();
    let member = msg.mentions.users.first();
    if (!addRole) return msg.channel.send(":x: **Erreur** | Veuillez mentionner un rôle existant")
    if (!member) return msg.channel.send(':x: **Erreur** | Veuillez mentionner un utilisateur existant')
    try {
        msg.member.addRole(`${addRole.id}`);
    } catch (error) {
        console.log(error);
        return msg.channel.send(":x: **Erreur** | Je ne peux pas mettre ce rôle car il est supérieur à moi.")
    }
    msg.channel.send(`:white_check_mark: | Le rôle ${addRole.name} a été ajouté à ${member.tag}`)
        .then(message => {
            var log = client.channels.findAll('id', '441238995721125888');
            log.forEach(channel => {
                channel.send(`La commande \`=add-role\` vient d'être utilisé par ${sender} sur le serveur \`${server}\``)
            })
        });
      }
        if (msg.content.startsWith(prefixe + '-role') && admins.includes(msg.author.id)) {
          Log(msg, "-role")
          let sender = msg.author.username;
          let server = msg.guild.name;
          if (!msg.guild.member(client.user).hasPermission("MANAGE_ROLES")) return msg.channel.send(":x: | Je n'ai pas la permission `MANAGE_ROLES`")
          let addRole = msg.mentions.roles.first();
          let member = msg.mentions.users.first();
          if (!addRole) return msg.channel.send(":x: **Erreur** | Veuillez mentionner un rôle existant")
          if (!member) return msg.channel.send(':x: **Erreur** | Veuillez mentionner un utilisateur existant')
          try {
              msg.member.removeRole(`${addRole.id}`);
          } catch (error) {
              console.log(error);
              return msg.channel.send(":x: **Erreur** | Je ne peux pas mettre ce rôle car il est supérieur à moi.")
          }
          msg.channel.send(`:white_check_mark: | Le rôle ${addRole.name} a été retiré à ${member.tag}`)
              .then(message => {
                  var log = client.channels.findAll('id', '441238995721125888');
                  log.forEach(channel => {
                      channel.send(`La commande \`=add-role\` vient d'être utilisé par ${sender} sur le serveur \`${server}\``)
                  })
              });
            }

          //rps
          if (msg.content.startsWith(prefixe + 'rps') && false) {
            Log(msg, "rps")
            let sender = msg.author.username;
            let server = msg.guild.name;
            if (msg.content.substr(5) === 'papier' || msg.content.substr(5) === 'pierre' || msg.content.substr(5) === 'ciseaux') {
                let choice;
                let result;
                let my_choice;
                let your_choice;
                let result_choice;
                let number = Math.floor(Math.random() * Math.floor(3));
                if (number === 0) {
                    choice = 'pierre';
                    my_choice = '⛏';
                }
                if (number === 1) {
                    choice = 'papier';
                    my_choice = '📃';
                }
                if (number === 2) {
                    choice = 'ciseaux';
                    my_choice = '✂️';
                }
                if (msg.content.substr(5) === 'pierre') {
                    your_choice = '⛏';
                    if (choice === 'pierre') {
                        result = 'Egalité';
                        result_choice = '⛏ = ⛏';
                    }
                    if (choice === 'papier') {
                        result = "J'ai gagné";
                        result_choice = '⛏ < 📃';
                    }
                    if (choice === 'ciseaux') {
                        result = 'Vous avez gagné';
                        result_choice = '⛏ > ✂️'
                    }
                }
                if (msg.content.substr(5) === 'papier') {
                    your_choice = '📃';
                    if (choice === 'pierre') {
                        result = 'Vous avez gagné';
                        result_choice = '📃 > ⛏'
                    }
                    if (choice === 'papier') {
                        result = "Egalité";
                        result_choice = '📃 = 📃'
                    }
                    if (choice === 'ciseaux') {
                        result = "J'ai gagné";
                        result_choice = '📃 < ✂️';
                    }
                }
                if (msg.content.substr(5) === 'ciseaux') {
                    your_choice = '✂️'
                    if (choice === 'pierre') {
                        result = "J'ai gagné";
                        result_choice = '✂️ < ⛏';
                    }
                    if (choice === 'papier') {
                        result = "Vous avez gagné";
                        result_choice = '✂️ > 📃'
                    }
                    if (choice === 'ciseaux') {
                        result = 'Egalité';
                        result_choice = '✂️= ✂️';
                    }
                }
                var rps_final_embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle('Jeu: Pierre / Papier / Ciseaux')
                    .setDescription(`Vous avez choisi ***${msg.content.substr(5)}***. J'ai choisi ***${choice}***.`)
                    .addField(result_choice, `${result} !`)
                    .setFooter(`Merci à TransiSciences pour cette fonction.`, msg.author.avatarURL)
                    .setTimestamp()
                msg.channel.send(rps_final_embed)
            } else {

            }

        /* ? */
  }

  if(msg.content.startsWith(prefixe+"mp ")) {
    if (admins.includes(msg.author.id)) {
      msg.author.send(msg.content.replace(prefixe+"mp ", ""))
    } else {
      msg.author.send("Voici votre MP :\n"+msg.content.replace(prefixe+"mp ", ""))
    }
  }

  // Pierre, feille, ciseaux !
  if (msg.content.startsWith(prefixe+"rps") && true) {
    Log(msg, "rps")
    var choice = msg.content.split(" ")[1]
    if (choice == "paper" || choice == "p") {
      var numb = Math.floor(Math.random() * 100);
      if (numb <= 50) {
        var choice2 = "paper";
      } else if (numb > 50) {
        var choice2 = "rock";
      } else {
        var choice2 = "scissors";
      }
      if (choice2 == "scissors") {
        var response = "Moi : :scissors:\nToi : :newspaper:\nJ'ai gagné!"
      } else if (choice2 == "paper") {
        var response = "Moi : :newspaper:\nToi : :newspaper:\nEgalite !"
      } else {
        var response = "Moi : :pick:\nToi : :newspaper:\nTu as gagné !"
      }
      msg.channel.send({embed:{
        title: "RPS",
        description: response,
        color: 255
      }});
    } else if (choice == "rock" || choice == "r") {
      var numb = Math.floor(Math.random() * 100);
      if (numb <= 50) {
        var choice2 = "paper";
      } else if (numb > 50) {
        var choice2 = "rock";
      } else {
        var choice2 = "scissors";
      }
      if (choice2 == "paper") {
        var response = "Moi : :newspaper:\nToi : :pick:\nJ'ai gagné !"
      } else if (choice2 == "rock") {
        var response = "Moi : :pick:\nToi : :pick:\nEgalité !"
      } else {
        var response = "Moi : :scissors:!\nToi : :pick:\nTu as gagné !"
      }
      msg.channel.send({embed:{
        title: "RPS",
        description: response,
        color: 255
      }});
    } else if (choice == "scissors" || choice == "s") {
      var numb = Math.floor(Math.random() * 100);
      if (numb <= 50) {
        var choice2 = "paper";
      } else if (numb > 50) {
        var choice2 = "rock";
      } else {
        var choice2 = "scissors";
      }
      if (choice2 == "rock") {
        var response = "Moi : :newspaper:\nToi : :scissors:\nTu as gagné !"
      } else if (choice2 == "scissors") {
        var response = "Moi : :scissors:\nToi : :scissors: \nEgalité !"
      } else {
        var response = "Moi : :pick:\nToi : :scissors:.\nJ'ai gagné !"
      }
      msg.channel.send({embed:{
        title: "RPS",
        description: response,
        color: 255
      }});
    } else {
      msg.channel.send(`You need to use \`${prefixe}rps\` <rock|paper|scissors>`);
    }
  }

  //
}

//
// Tout le temps :
//

if(msg.author.bot==false){historique.push(msg)}
if (msg.author.id==tracé||msg.channel.id==tracé) {
  console.log("\n\nMessage de "+msg.author.tag+" dans "+msg.channel.name+" ("+msg.channel.id+") :\n"+msg.content)
}

if (début == true) {
  début = false
}
if(msg.channel.type == "dm" && msg.author.id != admins[0]) {
  client.channels.findAll("id", "452806730947100692").forEach(salon => {
    salon.send({embed:{
      title: "Message privé",
      description: msg.content+"\n\nDe "+msg.author+".",
      color: 255*255,
    }})
  })
}

});

client.on("addReaction", react => {
  client.channels.findAll("id", "441238995721125888").forEach(salon => {
    salon.send("Réaction ajoutée.")
  });
});

function off (msg) {
  console.error("La commande 'off()' a été exécutée.")
  statusChangé = true
  msg.channel.send({embed:{title: ":white_check_mark: | Je suis éteint."}})
  var log = client.channels.findAll('id', '451774458370326530');
  log.forEach(channel => {
    channel.send(bloqués+"\n"+"var ...")
  })
  setTimeout(function(){vraioff()}, 1000)
}

function vraioff () {
  fcgdckvghgcuvgjghfctyfgh
}

function Log (msg, f) {
  
}

function couleur_auto (msg) {
  if (admins.includes(msg.author.id)) {
    return 255*255
  } else {
    return 255
  }
}

function emoji (couleur, nom, id) {
  if ( couleur == "#00FF00" || couleur == "#0F0" || couleur == "Vert" || couleur == "vert" ) {
    return "<:Vert:446008527123906570>"
  } else if ( couleur == "#FF0000" || couleur == "#F00" || couleur == "Rouge" || couleur == "rouge" ) {
    return "<:Rouge:446008626549751819>"
  } else if ( couleur == "#0000FF" || couleur == "#00F" || couleur == "Bleu" || couleur == "bleu" ) {
    return "<:Bleu:446008587639193653>"
  } else if ( couleur == "#FFFF00" || couleur == "#FF0" || couleur == "Jaune" || couleur == "jaune" ) {
    return "<:Jaune:446008487399391233>"
  } else if ( couleur == "#FF00FF" || couleur == "#F0F" || couleur == "Magenta" || couleur == "magenta" ) {
    return "<:Magenta:446008605620305926>"
  } else if ( couleur == "#00FFFF" || couleur == "#0FF" || couleur == "Cyan" || couleur == "cyan" ) {
    return "<:Cyan:446008567707729920>"
  } else if ( couleur == "patate" ) {
    return "<:patate:450709921936179241>"
  } else if ( couleur == "sel" ) {
    return "<:sel:451051697582899211>"
  } else if ( couleur == "huile" ) {
    return "<:huile:451051978764713995>"
  } else if ( couleur == "bonbon" ) {
    return "<:bonbon:452134314746970112>"
  } else if ( couleur == "V" ) {
    return "<:tickYes:315009125694177281>"
  } else if ( couleur == "X" ) {
    return "<:tickNo:315009174163685377>"
  } else if ( couleur == "Lulu5239" || couleur == "lulu5239") {
    return "<a:loadingflash:453611817269198859>"
  } else if ( couleur == "LONG" || couleur == "long") {
    return "<a:long1:454946063535833088> <a:long2:454946100042924033> <a:long3:454946125242302464> <a:long4:454946143365890049>"
  } else {
    return "<:a:"+couleur+">"
  }
} // 

client.login(tokens);
