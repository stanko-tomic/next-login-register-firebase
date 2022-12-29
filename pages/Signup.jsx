import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";

import styles from "../styles/Signin.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      router.push("/Account");
    } catch (e) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Suspense>
      {loading ? (
        <div>
          <Spinner loading={loading} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.gridContainer}>
            <article className={styles.gradient}>
              <div className={styles.circle}>
                <div className={styles.blur}></div>
              </div>
            </article>
            <article className={styles.loginPage}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formTitle}>
                  <h1>Hello! We're glad you're here.</h1>
                  <p>Please take a moment to sign up and join our community.</p>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.labelError}>
                    <label>Email Address</label>
                    <p className={styles.error}>{error}</p>
                  </div>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    type="email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    type="password"
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.formGroupBtn}`}>
                  <button>Sign In</button>
                </div>
                <p>
                  Already have an account? <Link href="/Signin">Sign in.</Link>
                </p>
              </form>
            </article>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Signup;
