
import Demo2 from '@views/demo2';
export default {
  // component: () => import('../../../src/views/demo2'),
  component: Demo2,
  list: [
    {
      type: 'v-show',
      selector: '.element',
      dataKey: 'visible'
    },
    {
      type: 'v-if',
      selector: '.if-element',
      dataKey: 'visible'
    },
    {
      type: 'text',
      selector: '.title',
      dataKey: 'title'
    }
  ]
}
