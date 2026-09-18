export class RandomGenerator {

   
    static generateEmployeeId()
    {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        return randomNumber.toString();
    }
}