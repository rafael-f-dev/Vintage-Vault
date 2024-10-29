import React from 'react';


const Footer = () => {
    return (<div className='footer'>
              <ul className='footer-list'>
                <li className='footer-item'>
                   <p className='footer-title'>Info</p>
                   <p>About</p>
                   <p>FAQs and Delivery</p>
                   <p>Privacy Policy</p>
                </li>
                <li className='footer-item'>
                    <p className='footer-title'>Follow</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                </li>
                <li className='footer-item'>
                    <p className='footer-title'>Contact Us</p>
                    <p>123 Maple Avenue</p>
                    <p>Hartford, CT 06103</p>
                    <p>United States</p>
                    <p>hello@vintagevault.com</p>
                    <p className='copyright' >Vintage Vault © 2024</p>
                </li>
              </ul>
        </div>)
}


export default Footer;