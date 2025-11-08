import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import './components/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHippo } from '@fortawesome/free-solid-svg-icons';

export default function Layout() {
    const [on, setOn] = useState(false);
    const popupRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && on) {
            setOn(false);
        }
    };

    const handleClosePopup = () => {
        setOn(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [on]);

    return (
        <div className="layoutBody text-bg-secondary">
            <div className='layoutLeft d-none d-sm-block h-100 d-flex flex-column justify-content-start align-items-center'>
                <div className="logoContainer d-flex justify-content-center align-items-center ">
                    <div className="logo p-2 d-flex justify-content-center align-items-center  h-100 bg-dark">
                        <FontAwesomeIcon icon={faHippo} className="logoIcon text-light" />
                    </div>
                    <div className="logoText p-2 h-100 bg-light text-dark d-flex justify-content-center align-items-center">Ze Hippo</div>
                </div>

                <div className="barElements w-100 rounded d-flex flex-column justify-content-center ">
                    <motion.h4
                        initial={{ }}
                        whileHover={{ backgroundColor: 'black', color: "white" }}
                        transition={{ duration: 0.5 }}
                        className="Elements py-4"
                    >
                        Products
                    </motion.h4>

                    <motion.h4
                        initial={{ }}
                        whileHover={{ backgroundColor: 'black', color: "white" }}
                        transition={{ duration: 0.5 }}
                        className="Elements py-4"
                    >
                        Pricing
                    </motion.h4>

                    <motion.h4
                        initial={{ }}
                        whileHover={{ backgroundColor: 'black', color: "white" }}
                        transition={{ duration: 0.5 }}
                        className="Elements py-4"
                    >
                        Blog
                    </motion.h4>
                </div>
            </div>
            <div className='layoutRight h-100'>
                <Todos />
            </div>

            <button onClick={() => setOn(!on)} className="addTask d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faPlus} className="icons text-light h-50" />
            </button>

            {on &&
            <motion.div
                ref={popupRef}
                className="addCardContainer position-fixed"
                initial={{ opacity: 0, scale: 0 }}
                animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            >
                <AddTodo onCreate={() => setOn(false)} />
            </motion.div>
            }
        </div>
    );
}
