/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import styles from "./../../../styles/Footer.module.scss";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";
import { SiDiscord } from "react-icons/si";
import Image from 'next/image'


const Footer = () => {

    return (
        <>
            <div className={styles["footer-container"]}>
                <div className={styles["content-container"]}>
                    <div className={styles["about"]}>

                        <a href="/" className={`a ${styles["website-link"]}`} >
                            https://internify-deploy.vercel.app/
                        </a>
                        <div className={styles["about-text"]}>
                            <p>Internify is a comprehensive internship portal designed to connect students with their next professional stepping stone. By participating in Internify, students can enhance their industry acumen, engage with potential employers, and foster the skills essential for their future careers    </p>
                        </div>
                        <div className={styles["copyright"]}>
                            <p>©2024 Internify. All rights reserved.</p>
                        </div>
                        <div className="py-2">
                            <Image
                                src="/Internify-logo.png"
                                width={80}
                                height={50}
                                alt="logo"
                            />
                        </div>
                    </div>
                    <div className={styles["physical"]}>
                        <div className={styles["title"]}>
                            <h2>Students</h2>
                        </div>
                        <div className={styles["column"]}>
                            <Link href="/profile" ><p>Profile</p></Link>
                            <Link href="/listing"><p>Intern Listing</p></Link>
                            <Link href="/recommendation"><p>Recommendation</p></Link>

                        </div>
                    </div>
                    <div className={styles["online"]}>
                        <div className={styles["title"]}>
                            <h2>Company</h2>
                        </div>
                        <div className={styles["column"]}>
                            <Link href="/profile"><p>Profile</p></Link>
                            <Link href="/project"><p>Project Showcase</p></Link>
                        </div>
                    </div>

                    <div className={styles["footer-bottom"]}>

                        <div className={styles["social-media"]}>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/usmofficial1969/" rel="noreferrer"
                                className="a"
                            >
                                <AiFillInstagram className={styles["icons"]} />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.facebook.com/USMOfficial1969" rel="noreferrer"
                            >
                                <AiFillFacebook className={styles["icons"]} />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/school/universiti-sains-malaysia-official/" rel="noreferrer"
                            >
                                <AiFillLinkedin className={styles["icons"]} />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.youtube.com/@usmcast" rel="noreferrer"
                            >
                                <AiFillYoutube className={styles["icons"]} />
                            </a>
                            <a
                                target="_blank"
                                href="https://discord.gg/8wR2gU6B" rel="noreferrer"
                            >
                                <SiDiscord className={styles["icons"]} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
