import Vue from 'vue'

export default () => {
  Vue.filter('capitalize', function (value) {
    const separateWord = value.toLowerCase().split(' ');
    for (let i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
  })

  Vue.filter('initials', function (name) {
    name = name.split(' ')
    return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;

  })
}