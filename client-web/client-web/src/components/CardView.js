import React from 'react';
import './CardView.css';
import { Link } from 'react-router-dom';

import prettyMoney from '../helpers/prettyMoney'

const CardView = (props) => {
  let data = props.data
  return (
    <div className="col-4">
      <div className="thumbnail-view">
        <div className="thumbnail">
          {(data === null)
         ? <h5> No Result Found </h5>
         : <Link to={`/detail/${data.status}/${data._id}`} >
            <div className="image-container-card">
              <img src={data.image} alt="thumbnail" className="img-responsive" />
            </div>
            <div className="caption">
              <h5>{prettyMoney(data.price.amount)}</h5>
              <h4><strong>{data.name}</strong></h4>
              <p className="location"><i className="fa fa-map-marker"></i> {data.city}</p>
            </div>
            <div className="thumbnail-footer">
              <div className="flex">
                <div className="detail-icon" data-toggle="tooltip" title="Luas Tanah">
                  1200
                </div>
                <div className="detail-icon" data-toggle="tooltip" title="Luas Bangunan">
                  1000
                </div>
                <div className="detail-icon" data-toggle="tooltip" title="Jumlah Kamar Mandi">
                  <i className="fa fa-bath" aria-hidden="true"></i> 5
                </div>
                <div className="detail-icon" data-toggle="tooltip" title="Jumlah Kamar Tidur">
                  <i className="fa fa-bed" aria-hidden="true"></i> 2
                </div>
              </div>
            </div>
          </Link>
        }
        </div>
      </div>
    </div>
  );
};

export default CardView;
