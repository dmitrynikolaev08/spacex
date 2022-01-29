import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery, gql } from '@apollo/client'

interface Launch {
    id: string;
    mission_name: string;
    launch_date_local: string
}

interface LaunchesData {
    launches: Launch[]
}


interface ILanchesRequest {
    limit?: number
    offset?: number
}

let loadedLaunches: Array<Launch> = [];

export const Launches: React.FC<ILanchesRequest> = ({ limit, offset }) => {
    const { loading, data } = useQuery<LaunchesData>(gql`
        query {
                launches (limit: ${limit}, offset: ${offset}) {
                id
                mission_name
                launch_date_local
                rocket {
                    rocket_name
                }
            }
        } 
    `);

    if (data !== undefined) {
        loadedLaunches.push(...data.launches);
    }

    return (
        <div>
            <h3>Most recent launches</h3>
            {loading ? (<p>Loading...</p>
            ) : (
                <Fragment>
                    {loadedLaunches.map(launch => (
                        <div>
                            <h5>{launch.id}</h5>
                            <p>{launch.mission_name}</p>
                            <p>{launch.launch_date_local}</p>
                        </div>
                    ))}
                    <Button variant="outline-info" onClick={() => {

                    }}>Load more...</Button>{' '}
                </Fragment>
            )}
        </div>
    )
}

Launches.defaultProps = {
    limit: 10,
    offset: 0
}