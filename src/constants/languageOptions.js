export const languageOptions = [
    {
        code: 'en',
        name: 'English',
        country_code: 'in'
    },

    {
        code: 'tn',
        name: 'Dhivehi',
        country_code: 'in'
    },
    // {
    //     code: 'hi',
    //     name: 'Hindi',
    //     country_code: 'in'
    // },
    // {
    //     code: 'tn',
    //     name: 'தமிழ்',
    //     country_code: 'in'
    // },
    
];

export const getLanguage = (lang)=>{
    return `locale=${lang?.code}`;
};