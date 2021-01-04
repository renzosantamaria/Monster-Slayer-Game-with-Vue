const app = Vue.createApp({
    data(){
        return{
            monsterHealth: 100,
            userHealth: 100,
            attackValue: 0,
            healValue: 0,
            roundNr: 3,
            active : true,
            result : "",
            userHealthBarColor : "#00a876",
            monsterHealthBarColor: "#00a876",
            logs : [],
            logMessage: ""
        }
    },

    computed: {
        monsterHealthBar(){
            return {width: this.monsterHealth + '%', backgroundColor: this.monsterHealthBarColor }
            // return {backgroundColor: this.orange}
        },
        userHealthBar(){
            // return this.userHealth + '%'
            return {width: this.userHealth + '%', backgroundColor: this.userHealthBarColor}
        },
        disabledAttack(){
            // return this.roundNr % 3 != 0
            if (this.roundNr < 3) {
                return true
            }else{
                return false
            }
            
        }
    },

    watch:{
        userHealth(){
            if (this.userHealth > 60) {
                this.userHealthBarColor = "#00a876"
            }
            if (this.userHealth < 60) {
                this.userHealthBarColor = "orange"
            }
            if (this.userHealth < 25) {
                this.userHealthBarColor = "red"
            }
            this.userHealth < 0 ? this.userHealth = 0 : ""
            if (this.userHealth == 0) {
                this.active = false
                this.result = "You lost!"
            }
            if (this.userHealth == 0 && this.monsterHealth == 0) {
                this.result = "It's a draw!"
            }
        },
        
        monsterHealth(){
            if (this.monsterHealth > 60) {
                this.monsterHealthBarColor = "#00a876"
            }
            if (this.monsterHealth < 60) {
                this.monsterHealthBarColor = "orange"
            }
            if (this.monsterHealth < 25) {
                this.monsterHealthBarColor = "red"
            }
            this.monsterHealth < 0 ? this.monsterHealth = 0 : ""
            if (this.monsterHealth == 0) {
                this.active = false
                this.result = "You won!"
            }
            if (this.userHealth == 0 && this.monsterHealth == 0) {
                this.result = "It's a draw!"
            }
        }
    },

    methods:{

        randomNumber(min, max){
            return Math.floor((Math.random() * (max - min) + min)) 
        },

        userAttack(){
            this.attackValue = this.randomNumber(12, 6)
            this.monsterHealth -= this.attackValue
            // this.logs.unshift(this.battleLog("You ", "attacked for ",this.attackValue))
            this.logMessage = this.battleLog("You ", "attacked for ",this.attackValue) + " and " 
            console.log(this.logMessage);
            this.monsterAttack()
            this.roundNr++

            // this.m = battleLog(user,this.attacked,this.attackValue)
            // console.log(this.logs);
        },
        monsterAttack(){
            this.attackValue = this.randomNumber(14, 6)
            // this.logs.unshift(this.battleLog("The monster ", "attacked you for ",this.attackValue))
            this.logMessage += this.battleLog("The monster ", "attacked you for ",this.attackValue)
            console.log(this.logMessage);
            this.logs.unshift(this.logMessage)
            this.logMessage = ""
            setTimeout(() => {
                this.userHealth -= this.attackValue
            }, 350);
                
        },
        specialAttack(){
            this.attackValue = this.randomNumber(18, 10)
            this.monsterHealth -= this.attackValue
            this.logMessage = this.battleLog("You ", "Super attacked for ",this.attackValue) + " and "
            this.monsterAttack()
            // this.roundNr++
            this.roundNr = 0
            console.log(this.roundNr);
        },  
        heal(){
            this.healValue = this.randomNumber(18, 12)
            // this.logs.unshift(this.battleLog("You ", "healed for ",this.healValue))
            this.logMessage = this.battleLog("You ", "healed for ",this.healValue) + " and "
            if(this.userHealth + this.healValue > 100){
                this.userHealth = 100
            }else{
                this.userHealth += this.healValue
            }
            this.monsterAttack()
            this.roundNr++
        },
        surrender(){
            this.userHealth = 0
        },
        restart(){
            this.monsterHealth = 100
            this.userHealth = 100
            this.attackValue = 0
            this.healValue = 0
            this.roundNr = 3
            this.active = true
            this.result = ""
            this.logs = []
        },
        battleLog(who,action,value){
            return who + action + value
        }
    }
})

app.mount('#game')
