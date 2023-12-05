import { ADD_CATEGORIES } from "./action";

const initialState = {
 categories: [
  {_id:1,category_name:"Fresh Vegetables", 
  image:'https://images.unsplash.com/photo-1553536645-f83758b55d23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D',
  sub_cateries:[
    {_id:1, name:'Tomatoes'},
    {_id:2, name:'Spinach'},
    {_id:3, name:'Onions'}
  ]},
  {_id:2,category_name:"Diet Food", 
  image:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlldCUyMGZvb2R8ZW58MHx8MHx8fDA%3D',
  sub_cateries:[
    {_id:1, name:'Quinoa'},
    {_id:2, name:'Oats'},
  ]},
  {_id:3,category_name:"Healthy Food", 
  image:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVsdGh5JTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  sub_cateries:[
    {_id:1, name:'Boiled Eggs'},
    {_id:2, name:'Whole Wheat'},
  ]},
  {_id:4,category_name:"Fast Food Items", 
  image:'https://media.istockphoto.com/id/859791766/photo/collage-of-various-fast-food-products.webp?b=1&s=170667a&w=0&k=20&c=LLkVv9rr4r4yt7zduCVaWuBvXdZ3ow6UdUqsJb-0VqQ=',
  sub_cateries:[
    {_id:1, name:'Sandwich'},
    {_id:2, name:'Burger'},
    {_id:3, name:'Tacos'},
    {_id:4, name:'Pizza'},
  ]},
  {_id:5,category_name:"Juicy Fruits", 
  image:'https://images.unsplash.com/photo-1655505384900-60b94b56252d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8SnVpY3klMjBGcnVpdHN8ZW58MHx8MHx8fDA%3D',
  sub_cateries:[
    {_id:1, name:'Watermelon'},
    {_id:2, name:'Grapes'},
    {_id:3, name:'Berries'}
  ]}
]
};
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    default:
      return state;
  }
}
export default reducers;