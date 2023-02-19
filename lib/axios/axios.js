import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/'
});



export async function post(route, data)
{
  try {
    const res = await instance.post(route, data);
    return true;
  } catch(err) {
    console.error(err);
    return false;
  }
}


export async function get(route)
{
  try {
    const res = await instance.get(route);
    console.log(res.data);
    return true;
  } catch(err) {
    console.log('error here get');
    console.error(err);
    return false;
  }
}
