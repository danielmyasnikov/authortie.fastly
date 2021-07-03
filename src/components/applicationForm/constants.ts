export const CATEGORY_DEFAULT = [
  {
    value: 'Повысить цитируемость своих работ',
    checked: false,
    workType: 'cite_mines',
    workTypeRevert: 'cite_others',
  },
  {
    value: 'Стать соавтором/соисполнителем',
    checked: false,
    workType: 'invite_coathor',
    workTypeRevert: 'become_coathor',
  },
  {
    value: 'Найти рецензента/эксперта/эдвайзора',
    checked: false,
    workType: 'find_reviewer',
    workTypeRevert: 'become_reviewer',
  },
];

export const knowledgeDefault = [
  { value: 'Biology/Genetics', checked: false, id: 'biology_genetics' },
  { value: 'Neuro/Psycho', checked: false, id: 'neuro_psycho' },
  { value: 'Medicine/Pharma', checked: false, id: 'medicine_pharma' },
  { value: 'Chemistry', checked: false, id: 'chemistry' },
  { value: 'Math/Computer', checked: false, id: 'math_computer' },
  { value: 'Physics/Astronomy', checked: false, id: 'physics_astronomy' },
  { value: 'Engineering/Material', checked: false, id: 'engineering_material' },
  { value: 'Earth/Environment', checked: false, id: 'earth_environment' },
  { value: 'Social', checked: false, id: 'social' },
  { value: 'Humanities/Arts', checked: false, id: 'humanities_arts' },
  { value: 'Management/Economics', checked: false, id: 'management_econmics' },
];

export const responsiveCheckedDefault = [
  { value: 'Стать рецензентом', checked: true, workType: 'become_reviewer' },
  { value: 'Процитировать других в своей работе', checked: false, workType: 'cite_others' },
  { value: 'Предложить соавторство', checked: false, workType: 'become_coathor' },
];

export const currencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'RUB', value: 'RUB' },
  { label: 'EUR', value: 'EUR' },
  { label: 'CHN', value: 'CHN' },
];
