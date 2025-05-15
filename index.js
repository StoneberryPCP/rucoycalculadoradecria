const d = document

function instructions() {
  d.getElementById("instToggle").checked
    ? d.getElementById("instructions").style.display = "block"
    : d.getElementById("instructions").style.display = "none"
}

function enablePtrain() {
  d.getElementById("enablePt").checked
    ? d.getElementById("mageToggle").style.display = "block"
    : d.getElementById("mageToggle").style.display = "none"
}

function advancedOptions() {
  d.getElementById("advancedToggle").checked
    ? d.getElementById("advancedBoxes").style.display = "block"
    : d.getElementById("advancedBoxes").style.display = "none"
}

async function fadeAnimation(n) {
  d.getElementById("results").style.transition = "none"
  switch(n) {
    case 0:
      d.getElementById("results").style.backgroundColor = "#94d1b5"
      await new Promise(t => setTimeout(t, 0))
      d.getElementById("results").style.backgroundColor = "#367d5c"
      d.getElementById("results").style.transition = "0.8s"
      break
    case 1:
      d.getElementById("results").style.backgroundColor = "#ff8080"
      await new Promise(t => setTimeout(t, 200))
      d.getElementById("results").style.backgroundColor = "#367d5c"
      d.getElementById("results").style.transition = "1.8s"
      break
  }
}

async function calculation() {
  const base      = Math.floor(d.getElementById("box1").value)
  const stat      = Math.floor(d.getElementById("box2").value)
  const equips    = Math.floor(d.getElementById("box3").value)
  const att       = Math.floor(d.getElementById("box4").value)
  const crit      = d.getElementById("critRing").checked ? 0.035 : 0.01
  const critMulti = d.getElementById("critRing").checked ? 1.075 : 1.05
  const ptrain    = d.getElementById("enablePt").checked
  const magic     = d.getElementById("magePt"  ).checked
  
  d.getElementById("box1").value = base
  d.getElementById("box2").value = stat
  d.getElementById("box3").value = equips
  d.getElementById("box4").value = att

  let errors = 0
  let error1, error2, error3, error4
  error1 = error2 = error3 = error4 = ""
  if (base < 1 || base > 1000) {
    d.getElementById("box1").style.backgroundColor = "#ff8080"
    error1 = "Box 1 value must range from 1 to 1000. "
    errors++
  } else {
    d.getElementById("box1").style.backgroundColor = "#FFFFFF"
  }
  if (stat < 5 || stat > 1000) {
    d.getElementById("box2").style.backgroundColor = "#ff8080"
    error2 = "Box 2 value must range from 5 to 1000. "
    errors++
  } else {
    d.getElementById("box2").style.backgroundColor = "#FFFFFF"
  }
  if (equips < -80 || equips > 76) {
    d.getElementById("box3").style.backgroundColor = "#ff8080"
    error3 = "Box 3 value must range from -80 to 76. "
    errors++
  } else {
    d.getElementById("box3").style.backgroundColor = "#FFFFFF"
  }
  if (att < 4 || att > 60 || att == 6 || att == 8 || att == 10 || att == 12 || att == 14) {
    d.getElementById("box4").style.backgroundColor = "#ff8080"
    error4 = "Box 4 value must be a valid weapon. "
    errors++
  } else {
    d.getElementById("box4").style.backgroundColor = "#FFFFFF"
  }

  let targetEff = d.getElementById("box5").value
  if (targetEff < 75 && d.getElementById("critRing").checked && ptrain) {
    d.getElementById("box5").value = "75"
    d.getElementById("box5").style.backgroundColor = "#ffff80"
  } else if (targetEff < 35) {
    d.getElementById("box5").value = "35"
    d.getElementById("box5").style.backgroundColor = "#ffff80"
  } else if (targetEff > 99) {
    d.getElementById("box5").value = "99"
    d.getElementById("box5").style.backgroundColor = "#ffff80"
  } else {
    d.getElementById("box5").style.backgroundColor = "#FFFFFF"
  }
  targetEff = d.getElementById("box5").value
  
  if (errors > 0) {
    d.getElementById("rt1_1").innerHTML = errors + (errors == 1 ? " ERROR:" : " ERRORS:") + " Please ensure all fields are properly filled with valid entries."
    d.getElementById("rt1_2").innerHTML = ""
    d.getElementById("rt1_3").innerHTML = ""
    d.getElementById("resultsText2").innerHTML = error1 + error2 + error3 + error4
    d.getElementById("divider2").style.display = "none"
    d.getElementById("resultsText3").innerHTML = ""
    d.getElementById("resultsText4").innerHTML = ""

    fadeAnimation(1)
    window.scrollTo(0, d.body.scrollHeight)
    return
  }

  const mobArray = [
    { name:                  "Ratinho Lv.1", def:   4, hp:   25, ptrain: false },
    { name:                  "Ratinhos Lv.3", def:   7, hp:   35, ptrain: false },
    { name:                 "Urubu do Rucoy Lv.6", def:  13, hp:   40, ptrain: false },
    { name:                 "Lobinhu AUUUU Lv.9", def:  17, hp:   50, ptrain: false },
    { name:            "Escorpião (não é signo) Lv.12", def:  18, hp:   50, ptrain: false },
    { name:               "Cobra (la ele) Lv.13", def:  18, hp:   50, ptrain: false },
    { name:                "Minhoca (la ele mil vezes) Lv.14", def:  19, hp:   55, ptrain: false },
    { name:              "Goblin Lv.15", def:  21, hp:   60, ptrain:  true },
    { name:               "Mumias Lv.25", def:  36, hp:   80, ptrain:  true },
    { name:             "Faraó Lv.35", def:  51, hp:  100, ptrain:  true },
    { name:            "Assassinos Lv.45", def:  71, hp:  120, ptrain:  true },
    { name:            "Assassinos Lv.50", def:  81, hp:  140, ptrain:  true },
    { name:      "Assassino Ninja Lv.55", def:  91, hp:  160, ptrain:  true },
    { name:     "Esqueleto Arqueiro Lv.80", def: 101, hp:  300, ptrain: false },
    { name:              "Zombie Lv.65", def: 106, hp:  200, ptrain:  true },
    { name:            "Esqueletos Lv.75", def: 121, hp:  300, ptrain:  true },
    { name:    "Esqueleto Guerreiro Lv.90", def: 146, hp:  375, ptrain:  true },
    { name:            "Chupa Sangue Lv.100", def: 171, hp:  450, ptrain:  true },
    { name:            "Chupa Sangue Lv.110", def: 186, hp:  530, ptrain:  true },
    { name:        "Drow Ranger Lv.125", def: 191, hp:  600, ptrain: false },
    { name:          "Drow Mago Lv.130", def: 191, hp:  600, ptrain: false },
    { name:      "Drow Assassino Lv.120", def: 221, hp:  620, ptrain:  true },
    { name:     "Drow Feiticeiro Lv.140", def: 221, hp:  600, ptrain: false },
    { name:       "Drow Lutador Lv.135", def: 246, hp:  680, ptrain:  true },
    { name:      "Calango Arqueiro Lv.160", def: 271, hp:  650, ptrain: false },
    { name:      "Calango Shaman Lv.170", def: 276, hp:  600, ptrain: false },
    { name:          "Zoiudo dos Gargula Lv.170", def: 276, hp:  600, ptrain: false },
    { name:     "Calango de escudo Lv.150", def: 301, hp:  680, ptrain:  true },
    { name:              "Gênio da Lampada Lv.150", def: 301, hp:  640, ptrain:  true },
    { name: "Calango Shamn Brabo Lv.190", def: 326, hp:  740, ptrain: false },
    { name:           "Gargula Lv.190", def: 326, hp:  740, ptrain:  true },
    { name:     "Capitão Calango lv.180", def: 361, hp:  815, ptrain:  true },
    { name:           "Chifrudin do Minotauro Lv.225", def: 511, hp: 4250, ptrain:  true },
    { name:           "Chifrudo do Minotauro Lv.250", def: 601, hp: 5000, ptrain:  true },
    { name:           "Chifrudaço do Minotauro Lv.275", def: 691, hp: 5750, ptrain:  true },
    ]

  const totalStat    = stat + equips
  const ticks        = ptrain ? 38 : 10
  const specMulti    = (ptrain ? 1.5 * (magic ? 1.08 : 1) : 1)
  const min          = specMulti * (base / 4 + att * totalStat / 20)
  const max          = specMulti * (base / 4 + att * totalStat / 10)
  const avgCritMulti = 1 + (critMulti - 1) / 2
  const targetProb   = 1 - ((100 - targetEff) / 100) ** (1 / ticks)

  let targetMob, targetMobDef, nextMob, nextMobDef, statsFor1Dmg, reqStats, duration, finalProb
  targetMob = targetMobDef = nextMob = nextMobDef = statsFor1Dmg = reqStats = duration = finalProb = 0
  for (let i = 0; i < mobArray.length; i++) {
    if (ptrain && !mobArray[i].ptrain) { continue }
    const prob = Math.min((1 - crit) * (max - mobArray[i].def) / (max - min) + crit, 1)
    if (targetProb < prob) {
      finalProb = 100 - 100 * (1 - prob) ** ticks
      const durationCheck = min < mobArray[i].def
        ? mobArray[i].hp / (
          crit * (max * avgCritMulti - mobArray[i].def) +
            (1 - crit) * (max - mobArray[i].def) * prob / 2
        )
        : mobArray[i].hp / (
          crit * (max * avgCritMulti - mobArray[i].def) +
            (1 - crit) * (max + min - 2 * mobArray[i].def) / 2
        )
      if (duration < durationCheck) {
        duration = durationCheck
        targetMob = mobArray[i].name
        targetMobDef = mobArray[i].def
      } else if (duration == durationCheck) {
        targetMob += " & " + mobArray[i].name
      }
    } else {
      nextMob = mobArray[i].name
      nextMobDef = mobArray[i].def
      reqStats = Math.ceil(
        (20 * mobArray[i].def - 20 * base / 4 * specMulti) /
          (att * specMulti * (2 - (targetProb - crit) / (1 - crit)))
      ) - totalStat
      statsFor1Dmg = Math.ceil(
        10 * ((1 + nextMobDef) / specMulti - base / 4) / att
      )
      break
    }
  }

  let minutes = String(Math.floor(duration / 60))
  let seconds = String(Math.round((duration / 60 - minutes) * 60))
  if (minutes == 0) {
    minutes = "00"
  } else if (minutes.length == 1) {
    minutes = "0" + minutes
  }
  if (seconds.length == 1) {
    seconds = "0" + seconds
  }
  
  if (targetMob != 0) {
    d.getElementById("rt1_1").innerHTML = "Você pode " + (ptrain ? "treinar no " : "treinar no ") + targetMob + " com "
    d.getElementById("rt1_2").innerHTML = finalProb.toFixed(1) + "%"
    d.getElementById("rt1_2").style.color = "hsl(" + Math.max(0, 4.8 * (finalProb.toFixed(1) - 75)) + " 100% 60%)"
    d.getElementById("rt1_3").innerHTML = " de eficiencia" + " com uma duração de em média " + minutes + ":" + seconds + "."
    d.getElementById("resultsText2").innerHTML = "Você pode causar " + (Math.floor(max) - targetMobDef) + " de dano máximo e " + (Math.floor(max * critMulti) - targetMobDef) + " em caso de dano crítico."
  } else {
    d.getElementById("rt1_1").innerHTML = "Não há mobs que você possa treinar no seu nível."
    d.getElementById("rt1_2").innerHTML = ""
    d.getElementById("rt1_3").innerHTML = ""
    d.getElementById("resultsText2").innerHTML = ""
  }
  if (nextMob != 0) {
    d.getElementById("divider2").style.display = "block"
    d.getElementById("resultsText3").innerHTML = "Você poderá começar treinar no " + nextMob + " com mais de " + targetEff + "%+ de eficiência após mais" + reqStats + "" + (reqStats == 1 ? "nível." : "níveis.")
    d.getElementById("resultsText4").innerHTML = (max - nextMobDef) >= 1
    ? "Você poderá causar " + (Math.floor(max) - nextMobDef) + " de dano máximo no " + nextMob + "."
    : "Você precisa de " + (statsFor1Dmg - totalStat) + " de níveis" + ((statsFor1Dmg - totalStat) > 1 ? "s" : "") + " para causar 1 de dano máximo no " + nextMob + "."
  } else {
    d.getElementById("divider2").style.display = "none"
    d.getElementById("resultsText3").innerHTML = ""
    d.getElementById("resultsText4").innerHTML = ""
  }
  
  fadeAnimation(0)
  window.scrollTo(0, d.body.scrollHeight)
}
