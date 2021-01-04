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
            monsterHealthBarColor: "#00a876"
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
            this.monsterAttack()
            this.roundNr++
        },
        monsterAttack(){
            this.attackValue = this.randomNumber(14, 6)
            setTimeout(() => {
                this.userHealth -= this.attackValue
            }, 350);
                
        },
        specialAttack(){
            this.attackValue = this.randomNumber(18, 10)
            this.monsterHealth -= this.attackValue
            this.monsterAttack()
            // this.roundNr++
            this.roundNr = 0
            console.log(this.roundNr);
        },  
        heal(){
            this.healValue = this.randomNumber(18, 12)
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
        }
    }
})

app.mount('#game')
