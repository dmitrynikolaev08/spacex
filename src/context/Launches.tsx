import React from 'react'

import { useQuery, gql } from '@apollo/client'

interface Launch {
    id: string;
    mission_name: string;
    launch_date_local: string
}

interface LaunchesData {
    launches: Launch[]
}

const GET_LAUNCHES = gql`
    query {
            launches (limit: 10) {
            id
            mission_name
            launch_date_local
            rocket {
                rocket_name
            }
        }
    } 
`

export const Launches: React.FC = () => {
    const { loading, data } = useQuery<LaunchesData>(GET_LAUNCHES);

    return (
        <div>
            <h3>Most recent launches</h3>
            {loading ? (<p>Loading...</p>
            ) : (
                <div>
                    {data && data?.launches.map(launch => (
                        <div>
                            <h5>{launch.id}</h5>
                            <p>{launch.mission_name}</p>
                            <p>{launch.launch_date_local}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}