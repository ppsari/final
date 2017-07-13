import React from 'react';
import './CardView.css';

const CardView = (props) => {
  return (
    <div className="col-4">
      <div className="thumbnail-view">
        <div className="thumbnail">
          <a href="#" data-toggle="modal" data-target="#detailModal" >
            <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="thumbnail" className="img-responsive" />
            <div className="caption">
              <h5>Rp 30.000.000,-</h5>
              <h4><strong>Rumah Mewah, Akses Mudah Bogor</strong></h4>
              <p className="location"><i className="fa fa-map-marker"></i> Bogor</p>
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardView;
