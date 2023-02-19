const text = `
猴王的诞生
Hóu wáng de dànshēng
Birth of the Monkey King

我亲爱的孩子，
Wǒ qīn'ài de háizi,
my dear child,

我知道时间很晚了。
Wǒ zhīdào shíjiān hěn wǎnle.
I know it's late.
-
你玩了一天，
Nǐ wánle yītiān,
You played all day,

累了，
Lèile,
tired,

现在是睡觉的时候了。
Xiànzài shì shuìjiào de shíhòule.
now is the time to sleep.
-
但是你说你想在睡觉前听一个故事。
Dànshì nǐ shuō nǐ xiǎng zài shuìjiào qián tīng yīgè gùshì.
But you said you wanted to listen to a story before going to bed.`;


const sentences = text.split("-");
console.log(sentences);

sentences.forEach(line => console.log(line.split('')));




















