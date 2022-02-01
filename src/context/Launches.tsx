import React, { Fragment } from 'react'
export interface Launch {
    id: string;
    mission_name: string;
    launch_date_local: string;
    rocket_name: string;
}

export interface LaunchesData {
    launches: Launch[]
}

interface ILanchesRequest {
    loading?: boolean
    launches: Launch[]

}

export const Launches: React.FC<ILanchesRequest> = ({ loading, launches }) => {
    return (
        <div>
            <h3>Most recent launches</h3>
            {loading ? (<p>Loading...</p>
            ) : (
                <Fragment>
                    {launches.map(launch => (
                        <div>
                            <h5>{launch.id}</h5>
                            <p>{launch.mission_name}</p>
                            <p>{launch.launch_date_local}</p>
                        </div>
                    ))}
                </Fragment>
            )}
        </div>
    )
}

