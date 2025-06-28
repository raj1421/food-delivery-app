import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        Explore our menu in the food delivery app and discover a world of
        delicious possibilities, from mouth-watering appetizers to decadent
        desserts, all crafted to satisfy your cravings and delivered right to
        your doorstep!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => {
                setCategory((prev) =>
                  prev === item.menu_name ?"All":item.menu_name
                )
              }}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />  
              <p>{item.menu_name}</p>
            </div> 
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
