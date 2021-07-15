import React from 'react';
import Box from '@material-ui/core/Box';
import './HmsFooter.scss';

const HmsFooter = props => (
    <footer className="hms-footer">
        <ul className="hms-footer-nav">
            <li className="hms-footer-nav-item">
                <a href="/">
                    <img
                        src={
                            require('@mern-starter/data-sample/images/hclsw-logo-white.png')
                                .default
                        }
                        alt="HCL Software"
                    />
                </a>
            </li>
            <li className="hms-footer-nav-item">
                <a href="/">
                    <Box>Copyright &copy; 2021 HCL Technologies Limited test</Box>
                </a>
            </li>
            <li className="hms-footer-nav-item">
                <a href="/">
                    <img
                        src={
                            require('@mern-starter/data-sample/images/hcl-logo.png')
                                .default
                        }
                        alt="HCL"
                    />
                </a>
            </li>
        </ul>
    </footer>
);

export default HmsFooter;
