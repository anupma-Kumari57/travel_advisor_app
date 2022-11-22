import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlinedIcon } from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

import mapStyles from '../../mapStyles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyBc45LbnTBZUfKbgHJMkLJdy7Wo5xkw64g'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e)=>{
                    setCoordinates({lat:e.center.lat, lng:e.center.lng});
                    setBounds({ne:e.marginBounds.ne, sw:e.marginBounds.sw});
                }}
                onChildClick={(child)=>setChildClicked(child)}
                >
                {places?.map((place, i)=>(
                    <div
                    className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                    >
                        {
                            ! isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontsize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                    className={classes.pointer}
                                    src={place.photo? place.photo.images.large.url:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dineout.co.in%2Fchennai-restaurants%2Fwest-chennai%2Fkodambakkam&psig=AOvVaw3vckx4lMglu_4cmobyQY21&ust=1669094433735000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCND-xbjDvvsCFQAAAAAdAAAAABAI'}
                                    alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )}
                    </div>
                ))}
                {weatherData?.list?.map((data, i)=>(
                    <div key={i} lat={data.coord.lat} lng={data.coord.lng}>
                        <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                    </div>
                ))}
          
            </GoogleMapReact>

        </div>
    );
}

export default Map;