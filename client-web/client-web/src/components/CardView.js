import React from 'react';
import './CardView.css';
import { Link } from 'react-router-dom';

import prettyMoney from '../helpers/prettyMoney'

const CardView = (props) => {
  let data = props.data
  return (
    <div className="col-12 col-md-4">
      <div className="thumbnail-view">
        <div className="thumbnail">
          {(data === null)
         ? <h5> No Result Found </h5>
         : <Link to={`/detail/${data.status}/${data._id}`} >
            <div className="image-container-card relative">
              <img src={data.image} alt="thumbnail" className="img-responsive absolute-center-image" />
            </div>
            <div className="caption">
              <h6>{prettyMoney(data.price.amount)}
              {data.price.descr === null ? null : (<small> / {data.price.descr}</small>)}
            </h6>
              <h5><strong>{data.name}</strong></h5>
              <p className="location"><i className="fa fa-map-marker"></i> {data.city}</p>
            </div>
          </Link>
        }
        </div>
      </div>
    </div>
  );
};

export default CardView;
