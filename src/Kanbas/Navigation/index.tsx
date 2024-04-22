import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaInbox, FaCalendar, FaClock, FaArrowRight, FaQuestion } from "react-icons/fa";
function KanbasNavigation() {
  const links = [
    { label: "N"},
    { label: "Account",   icon: <FaRegUserCircle className="fs-2" />  },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" />  },
    { label: "Courses",   icon: <FaBook className="fs-2" />           },
    { label: "Calendar",  icon: <FaCalendar className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" />},
    { label: "History", icon: <FaClock className="fs-2" />},
    { label: "Studio", icon: <FaCalendar className="fs-2" />},
    { label: "Commons", icon: <FaArrowRight className="fs-2" />},
    { label: "Help", icon: <FaQuestion className="fs-2" />},
  ];
  const { pathname } = useLocation();
  return (



//     <ul className="wd-kanbas-navigation">
//   {pathname.includes("Courses") ? (
//     <li className={pathname.includes("Dashboard") ? "wd-active" : ""}>
//       <Link to="/Kanbas/Dashboard"> Dashboard </Link>
//     </li>
//   ) : (
//     links.map((link, index) => (
//       <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
//         <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
//       </li>
//     ))
//   )}
// </ul>





    <ul className="wd-kanbas-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;