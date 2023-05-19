export const AISettings = {
  //engine: "gpt-3.5-turbo-0301",
  max_tokens: 4096,
  max_response_tokens: 2048,
  temperature: 0,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
};

export const engines = [
  {
    id: 0,
    name: "Davinci",
    key: "text-davinci-003",
    maxTokens: 4000,
    costPerKiloToken: 0.02,
    description:
      "The most powerful GPT-3 model. It can perform a wide range of natural language tasks, including text generation, summarization, and more. It has the highest quality output, longest maximum length, and best instruction-following abilities.",
    descriptionFa:
      "قدرتمند‌ترین مدل GPT-3. قادر است وظایف گسترده‌ای در زمینه زبان طبیعی انجام دهد، شامل تولید متن، خلاصه‌سازی و غیره. خروجی با کیفیت بالا، طول بیشترین حداکثر و بهترین قابلیت دنبال کردن دستورالعمل را دارد.",
    abilities:
      "Advanced text generation, summarization, translation, and more.",
  },
  {
    id: 1,
    name: "Curie",
    key: "text-curie-001",
    maxTokens: 2000,
    costPerKiloToken: 0.002,
    description:
      "A versatile and efficient GPT-3 model. It can perform various natural language tasks, including text generation, summarization, and more. Its output quality and instruction-following abilities are not as high as Davinci, but it's still a powerful model.",
    descriptionFa:
      "مدل گسترده و کارآمد GPT-3. قادر است وظایف گسترده‌ای در زمینه زبان طبیعی انجام دهد، شامل تولید متن، خلاصه‌سازی و غیره. کیفیت خروجی و قابلیت دنبال کردن دستورالعمل‌های آن، به اندازه Davinci بالا نیست، اما همچنان یک مدل قدرتمند است.",
    abilities: "Text generation, summarization, translation, and more.",
  },
  {
    id: 2,
    name: "Babbage",
    key: "text-babbage-001",
    maxTokens: 2000,
    costPerKiloToken: 0.0005,
    description:
      "A capable GPT-3 model that can perform straightforward natural language tasks, such as classification and semantic search. It's less powerful than Curie and Davinci, but it's more cost-effective and can still be useful for various applications.",
    descriptionFa:
      "یک مدل قابلیت‌های GPT-3 است که می‌تواند وظایف ساده‌ی زبان طبیعی مانند طبقه‌بندی و جستجوی معنایی را انجام دهد. در مقایسه با Curie و Davinci کمتر قدرتمند است،اما هنوز هم برای برخی از کاربردهای مختلف مفید است و همچنان می‌تواند به صرفه‌جویی در هزینه منجر شود.",
    abilities: "Classification, semantic search, and more.",
  },
  {
    id: 3,
    name: "ada",
    key: "text-ada-001",
    maxTokens: 2000,
    costPerKiloToken: 0.0004,
    description:
      "A specialized GPT-3 model that focuses on language translation. It's less versatile than the other models, but it excels in translation tasks and can produce high-quality results.",
    descriptionFa:
      "یک مدل GPT-3 با تمرکز بر وظایف ترجمه زبانی. همچنین می‌تواند وظایف ساده‌ی تولید متن و خلاصه‌سازی را نیز انجام دهد، اما کیفیت خروجی و حداکثر طول آن کمتر از مدل‌های دیگر است. گزینه‌ی صرفه‌جویی در هزینه برای ترجمه زبان است.",
    abilities:
      "Language translation,Parsing text, simple classification, address correction, keywords",
  },
];

export const experimentalEngines = [
  {
    id: 0,
    key: "gpt-3.5-turbo",
    name: "gpt 3.5",
    maxTokens: 4096,
    costPerKiloToken: 0.02,
    description: "",
    descriptionFa: "",
    abilities: "",
  },
  {
    id: 1,
    key: "gpt-3.5-turbo-0301",
    name: "gpt 3.5 0301",
    maxTokens: 4096,
    costPerKiloToken: 0.02,
    description: "",
    descriptionFa: "",
    abilities: "",
  },
];
