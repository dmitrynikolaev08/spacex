import React, { useState, useEffect } from 'react'
import { Launch, Launches, LaunchesData } from '../../context/Launches';
import { gql } from '@apollo/client'
import { client } from '../../common/apollo-client'

const pageSize = 10;
let arrayForHoldingLaunches: Launch[] = [];
const GET_LAUNCHES = gql`
    query GetLaunches($limit: Int, $offset: Int) {
            launches (limit: $limit, offset: $offset) {
            id
            mission_name
            launch_date_local
            rocket {
                rocket_name
            }
        }
    }
     
`;

const Home: React.FC = () => {
    const [launchesToShow, setLaunchesToShow] = useState<Launch[]>([]);
    const [next, setNext] = useState(pageSize);

    const loadLaunches = async (limit: number, offset: number) => {
        let result;
        await client.query<LaunchesData>(
            {
                query: GET_LAUNCHES,
                variables: { limit: limit, offset: offset }
            }).then((response) => {
                console.log(response.data)
                result = response.data
            });
        return result !== undefined ? (result as LaunchesData).launches : [];
    }

    const loopWithSlice = async (start: number, end: number) => {
        const newLaunches = await loadLaunches(start, end);
        if (newLaunches !== undefined) {
            arrayForHoldingLaunches.push(...newLaunches);
            setLaunchesToShow(arrayForHoldingLaunches);
        }

    };

    useEffect(() => {
        loopWithSlice(0, pageSize);
    }, []);

    const handleShowMoreLaunches = () => {
        loopWithSlice(next, next + pageSize);
        setNext(next + pageSize);
    };

    return (
        <div>
            <Launches launches={launchesToShow} />
            <button onClick={handleShowMoreLaunches}>Load more</button>
        </div>
    );
}

export default Home;
