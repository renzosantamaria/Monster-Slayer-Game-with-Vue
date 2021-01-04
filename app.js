const app = Vue.createApp({
    data(){
        return{
            monsterHealth: 100,
            userHealth: 100,
            attackValue: 0,
            healValue: 0,
            roundNr: 0,
            active : true,
            result : ""
        }
    },

    computed: {
        monsterHealthBar(){
            return {width: this.monsterHealth + '%'}
        },
        userHealthBar(){
            // return this.userHealth + '%'
            return {width: this.userHealth + '%'}
        },
        disabledAttack(){
            return this.roundNr % 3 != 0
        }
    },

    watch:{
        userHealth(){
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
            this.attackValue = this.randomNumber(10, 5)
            this.monsterHealth -= this.attackValue
            this.monsterAttack()
            this.roundNr++
        },
        monsterAttack(){
            this.attackValue = this.randomNumber(12, 8)
            this.userHealth -= this.attackValue
        },
        specialAttack(){
            this.attackValue = this.randomNumber(18, 10)
            this.monsterHealth -= this.attackValue
            this.monsterAttack()
            this.roundNr++
        },
        heal(){
            this.healValue = this.randomNumber(14, 9)
            this.userHealth += this.healValue
            if(this.userHealth > 100){
                this.userHealth = 100
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
            this.roundNr = 0
            this.active = true
            this.result = ""
        }
    }
})

app.mount('#game')
