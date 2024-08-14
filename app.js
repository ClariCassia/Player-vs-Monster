new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: [],
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
        },
        attack(specialAttack) {
            this.hurt('monsterLife', 5, 10, specialAttack, 'Jogador', 'Monster', 'player')

            if (this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monster', 'Jogador', 'monster')
            }
        },

        hurt(prop, min, max, specialAttack, source, target, cls) { // prop = playerLife ou monsterLife
            const pluslAttack = specialAttack ? 5 : 0
            const hurt = this.getRandom(min + pluslAttack, max + pluslAttack)
            this[prop] = Math.max(this[prop] - hurt, 0) // garantindo que o player nunca fique negativo
            this.registerLog(`O ${source} atacou o ${target} com ${hurt}% de força`, cls)
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min // gera um valor aleatorio entre min e max
            return Math.round(value) // arredondando o valor
        },

        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        heal(max, min) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100) // garantindo que o player nunca fique maior que 100
            this.registerLog(`Jogador curou ${heal}% de vida`, 'player')
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls }) // garantindo que o log sempre apareca no começo da lista
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false // se o resultado for verdadeiro, parar o jogo
        }
    },

})