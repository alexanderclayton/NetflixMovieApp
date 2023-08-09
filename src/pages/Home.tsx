//import//
import { Main } from "../components/Main"
import { Row } from '../components/Row'
import requests from "../Requests"

export const Home:React.FC = () => {
  return (
    <div>
        <Main />
        <Row title="Upcoming" fetchURL={requests.requestUpcoming} rowId={1}/>
        <Row title="Popular" fetchURL={requests.requestPopular} rowId={2}/>
        <Row title="Trending" fetchURL={requests.requestTrending} rowId={3}/>
        <Row title="Top Rated" fetchURL={requests.requestTopRated} rowId={4}/>
        <Row title="Horror" fetchURL={requests.requestHorror} rowId={5}/>
    </div>
  )
}
