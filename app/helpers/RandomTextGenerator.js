class RandomTextGenerator {


    static generateNumber(length = 6) {
        if (process.env.NODE_ENV !== 'production') {
            return "123456";
        }
        let number = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            number += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return number;
    }

}

module.exports = RandomTextGenerator;