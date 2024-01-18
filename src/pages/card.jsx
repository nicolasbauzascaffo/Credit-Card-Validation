import React from "react";
import "../styles/card.css";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import confirmIcon from '../img/confirm.png'

function Card() {
  const [initialHolder, setinitialHolder] = useState("Nicolás Bauzá");
  const [initialCard, setinitialCard] = useState("0000000000000000");
  const [initialMonth, setinitialMonth] = useState("01");
  const [initialYear, setinitialYear] = useState("24");
  const [initialCVC, setinitialCVC] = useState("123");
  const [modal, setmodal] = useState(false);

  const changeHolderName = (e) => {
    setinitialHolder(() => e.target.value);
  };

  const changeCardNumber = (e) => {
    setinitialCard(() => e.target.value);
  };

  const changeMonth = (e) => {
    if (e.target.value < 10) {
      setinitialMonth(() => "0" + e.target.value);
    } else {
      setinitialMonth(() => e.target.value);
    }
  };

  const changeYear = (e) => {
    setinitialYear(() => e.target.value);
  };

  const changeCVC = (e) => {
    setinitialCVC(() => e.target.value);
  };

  return (
    <div className="card">
      <section className="left-section">
        <section className="front-card">
          <section className="circle-section">
            <section className="big-circle"></section>
            <section className="small-circle"></section>
          </section>
          <h2>{initialCard}</h2>
          <section className="info-card-section">
            <h3>{initialHolder}</h3>
            <h3>
              {initialMonth}/{initialYear}
            </h3>
          </section>
        </section>
        <section className="back-card">
          <section className="black-band"></section>
          <section className="cvc-section">
            <h4>{initialCVC}</h4>
          </section>
        </section>
      </section>
      <section className="right-section">
        <Formik
          initialValues={{
            cardHolder: "",
            cardNumber: "",
            month: "",
            year: "",
            cvc: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.cardHolder) {
              errors.cardHolder = "Required";
            } else if (!/^[a-zA-Z\s]+$/.test(values.cardHolder)) {
              errors.cardHolder = "Invalid name";
            }
            if (!values.cardNumber) {
              errors.cardNumber = "Required";
            } else if (!/^\d{16}$/i.test(values.cardNumber)) {
              errors.cardNumber = "Invalid card number";
            }
            if (!values.month) {
              errors.month = "Required";
            } else if (!/^(1[0-2]|[1-9])$/i.test(values.month)) {
              errors.month = "Invalid Month";
            }
            if (!values.year) {
              errors.year = "Required";
            } else if (!/^(2[4-9]|30)$/i.test(values.year)) {
              errors.year = "Invalid Year";
            }
            if (!values.cvc) {
              errors.cvc = "Required";
            } else if (!/^\d{3}$/i.test(values.cvc)) {
              errors.cvc = "Invalid cvc number";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setmodal(true);
              setSubmitting(false);
            }, 800);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="form-1">
              {!modal ? (
                <section className="form">
                  <section className="form-sec">
                    <label>Cardholder Name:</label>
                    <input
                      style={{
                        border:
                          errors.cardHolder && touched.cardHolder
                            ? "solid 1px red"
                            : "",
                      }}
                      type="text"
                      onChange={(e) => {
                        handleChange(e);
                        changeHolderName(e);
                      }}
                      onBlur={handleBlur}
                      value={values.cardHolder}
                      name="cardHolder"
                      placeholder="Ex: Nicolás Bauzá"
                    />
                  </section>
                  <section className="form-sec">
                    <label>Card Number:</label>
                    <input
                      style={{
                        border:
                          errors.cardNumber && touched.cardNumber
                            ? "solid 1px red"
                            : "",
                      }}
                      type="text"
                      onChange={(e) => {
                        handleChange(e);
                        changeCardNumber(e);
                      }}
                      onBlur={handleBlur}
                      value={values.cardNumber}
                      name="cardNumber"
                      placeholder="Ex: 0000 0000 0000 0000"
                    />
                  </section>
                  <section className="form-sec-3">
                    <section className="form-sec-3-info">
                      <label>Month:</label>
                      <input
                        onChange={(e) => {
                          handleChange(e);
                          changeMonth(e);
                        }}
                        style={{
                          border:
                            errors.month && touched.month
                              ? "solid 1px red"
                              : "",
                        }}
                        type="text"
                        onBlur={handleBlur}
                        value={values.month}
                        name="month"
                        placeholder="MM"
                      />
                    </section>
                    <section className="form-sec-3-info">
                      <label>Year:</label>
                      <input
                        style={{
                          border:
                            errors.year && touched.year ? "solid 1px red" : "",
                        }}
                        type="text"
                        onChange={(e) => {
                          handleChange(e);
                          changeYear(e);
                        }}
                        onBlur={handleBlur}
                        value={values.year}
                        name="year"
                        placeholder="YY"
                      />
                    </section>
                    <section className="form-sec-3-info">
                      <label>CVC:</label>
                      <input
                        style={{
                          border:
                            errors.cvc && touched.cvc ? "solid 1px red" : "",
                        }}
                        type="text"
                        onChange={(e) => {
                          handleChange(e);
                          changeCVC(e);
                        }}
                        onBlur={handleBlur}
                        value={values.cvc}
                        name="cvc"
                        placeholder="Ex: 123"
                      />
                    </section>
                  </section>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="confirm-button"
                  >
                    Confirm
                  </button>
                </section>
              ) : (
                <section className="modal">
                    <img src={confirmIcon} alt='confirm'/>
                    <h1>Thank you!</h1>
                    <p>We have added your card details</p>
                </section>
              )}
            </form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default Card;
