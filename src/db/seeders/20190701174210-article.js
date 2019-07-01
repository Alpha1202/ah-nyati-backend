module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [{
    title: 'Article',
    slug: 'article',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    tag_list: 'traffic,lagos,local,amity',
    cat_id: 1,
    user_id: 1
  },
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('Articles', null, {})
};
