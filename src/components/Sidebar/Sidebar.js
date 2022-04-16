import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import SofiaLogo from "../Icons/SofiaLogo.js";
import cn from "classnames";

const Sidebar = (props) => {
  const { activeItem = "", ...restProps } = props;

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false);

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true);
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false);
      }, 0);
    }
  }, [props.sidebarOpened]);

  return (
    <nav className={cn(s.root, { [s.sidebarOpen]: burgerSidebarOpen })}>
      <header className={s.logo}>
        <SofiaLogo />
        <span className={s.title}>SOFIA</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Dashboard"
          isHeader
          iconName={<i className={"eva eva-home-outline"} />}
          link="/dashboard"
          index="dashboard"
          badge="9"
        />
        <h5 className={s.navTitle}>MENU</h5>
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Beacon"
          isHeader
          iconName={<i className={"eva eva-cast"} />}
          link="/dashboard/beacons"
          index="beacons"
        />
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Ruangan"
          isHeader
          iconName={<i className={"eva eva-grid-outline"} />}
          link="/dashboard/rooms"
          index="rooms"
        />
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Pengguna"
          isHeader
          iconName={<i className={"eva eva-people-outline"} />}
          link="/users"
          index="typography"
        />
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Mata Kuliah"
          isHeader
          iconName={<i className={"eva eva-calendar-outline"} />}
          link="/users"
          index="typography"
        />
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Presensi"
          isHeader
          iconName={<i className={"eva eva-bookmark-outline"} />}
          link="/users"
          index="typography"
        />
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Settings"
          isHeader
          iconName={<i className={"eva eva-settings-outline"} />}
          link="/dashboard/settings"
          index="typography"
        />
        <h5 className={s.navTitle}>ARCHIVE</h5>
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Typography"
          isHeader
          iconName={<i className={"eva eva-text-outline"} />}
          link="/dashboard/typography"
          index="typography"
        />
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Tables"
          isHeader
          iconName={<i className={"eva eva-grid-outline"} />}
          link="/dashboard/tables"
          index="tables"
        />
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Notifications"
          isHeader
          iconName={<i className={"eva eva-bell-outline"} />}
          link="/dashboard/notifications"
          index="notifications"
        />
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="UI Elements"
          isHeader
          iconName={<i className={"eva eva-cube-outline"} />}
          link="/dashboard/uielements"
          index="uielements"
          childrenLinks={[
            {
              header: "Charts",
              link: "/dashboard/ui-elements/charts",
            },
            {
              header: "Icons",
              link: "/dashboard/ui-elements/icons",
            },
            {
              header: "Google Maps",
              link: "/dashboard/ui-elements/maps",
            },
          ]}
        />
      </ul>
      {/* <div className="bg-widget d-flex mt-auto ml-1">
        <Button
          className="rounded-pill my-3 body-2 d-none d-md-block"
          type="submit"
          color="secondary-red"
        >
          Unlock Full Version
        </Button>
      </div> */}
    </nav>
  );
};

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
