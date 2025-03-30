import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HumanosFlow({ user, onLogout }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [reflection, setReflection] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("humanos-answers");
    if (saved) {
      setAnswers(JSON.parse(saved));
      setStep(4);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("humanos-answers", JSON.stringify(answers));
    }
  }, [answers]);

  const handleNext = (newData) => {
    setAnswers((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };

  const renderNavButtons = () => (
    <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
      <button style={styles.navButton} onClick={() => setStep((prev) => Math.max(1, prev - 1))}>⬅ חזור</button>
      <button style={styles.navButton} onClick={() => setStep(1)}>עמוד ראשי 🏠</button>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: "left" }}>
          <button style={styles.logoutBtn} onClick={onLogout}>התנתקות</button>
        </div>
        {step === 1 && (
          <>
            <h1 style={styles.title}>שלום {user?.name || "משתמש"} 🌱</h1>
            <p style={styles.paragraph}>ברוך הבא ל־HUMANOS – המקום שבו אתה פוגש את עצמך, בלי מסכות.</p>
            <button style={styles.button} onClick={() => handleNext()}>בוא נתחיל</button>
          </>
        )}

        {step === 2 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleNext({
                  feeling: formData.get("feeling"),
                  blockedIn: formData.get("blockedIn"),
                  desiredFeeling: formData.get("desiredFeeling"),
                });
              }}
            >
              <h2 style={styles.subtitle}>3 שאלות קצרות</h2>

              <label>מה אתה מרגיש עכשיו?</label><br />
              <select name="feeling" style={styles.select}>
                <option>עייף</option>
                <option>מחפש כיוון</option>
                <option>מתפקד חיצונית, כבוי בפנים</option>
                <option>סקרן</option>
                <option>אחר</option>
              </select><br /><br />

              <label>איפה אתה לא בא לידי ביטוי?</label><br />
              <select name="blockedIn" style={styles.select}>
                <option>בקריירה</option>
                <option>ברגש</option>
                <option>ביצירתיות</option>
                <option>בקשרים עם אנשים</option>
                <option>מקום אחר</option>
              </select><br /><br />

              <label>מה היית רוצה להרגיש עמוק בפנים?</label><br />
              <select name="desiredFeeling" style={styles.select}>
                <option>חי</option>
                <option>מדויק</option>
                <option>שליו</option>
                <option>חשוב</option>
                <option>חופשי</option>
              </select><br /><br />

              <button type="submit" style={styles.button}>תראה לי מה זה HUMANOS בשבילי</button>
            </form>
            {renderNavButtons()}
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={styles.subtitle}>התובנה הראשונה שלך</h2>
            <p style={styles.paragraph}>
              {answers.feeling === "מתפקד חיצונית, כבוי בפנים"
                ? "אתה חי בין הצלחה חיצונית לריקנות פנימית. זה קורה לאנשים שמצפים מעצמם ליותר, ולא סולחים לעצמם על הפער."
                : "המסע שלך מתחיל בדיוק מהמקום שאתה בו. נלמד יחד מה מדויק לך באמת."}
            </p>
            <button style={styles.button} onClick={() => setStep(4)}>
              בנה לי את מפת הזהות שלי
            </button>
            {renderNavButtons()}
          </>
        )}

        {step === 4 && (
          <>
            <h2 style={styles.subtitle}>מפת הזהות שלך</h2>
            <p style={styles.paragraph}>
              {answers.feeling === "עייף" &&
                "אתה מרגיש עייף, אבל זה עייפות עמוקה יותר – עייפות של רעב פנימי למשהו אחר."}
              {answers.feeling === "מחפש כיוון" &&
                "אתה בתנועה. יש בך תשוקה להבין את ה’למה‘ שלך. זה זמן טוב לבהירות."}
              {answers.feeling === "מתפקד חיצונית, כבוי בפנים" &&
                "אתה שומר על חזות חזקה – אבל בפנים אתה שואל את עצמך למה אתה קם בבוקר."}
              {answers.feeling === "סקרן" &&
                "הסקרנות שלך היא דלק לחיים חדשים – רק צריך לתת לה כיוון."}
            </p>

            <div style={{ marginTop: "2rem" }}>
              <h4>🔎 גרף זהות רגשית</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    { name: "אנרגיה", value: answers.feeling === "סקרן" ? 80 : 50 },
                    { name: "חיבור לעצמי", value: answers.blockedIn === "ברגש" ? 30 : 60 },
                    { name: "פוטנציאל", value: 95 },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#5c6ac4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <button style={styles.button} onClick={() => setStep(5)}>
              התחל את הצעד הראשון
            </button>
            {renderNavButtons()}
          </>
        )}

        {step === 5 && (
          <>
            <h2 style={styles.subtitle}>הצעד הראשון שלך</h2>
            <p style={styles.paragraph}>
              עכשיו, כשאתה רואה את עצמך – איך אתה רוצה להמשיך?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button style={styles.button} onClick={() => setStep(6)}>🧘 תרגול ראשון – 10 דקות לעצמך</button>
              <button style={styles.button} onClick={() => alert("בניית מסלול אישי תתחיל!")}>📍 בניית מסלול אישי</button>
              <button style={styles.button} onClick={() => alert("פותחים דיאלוג עם HUMANOS...")}>🤖 שיחה עם HUMANOS (AI)</button>
            </div>
            {renderNavButtons()}
          </>
        )}

        {step === 6 && (
          <>
            <h2 style={styles.subtitle}>תרגול ראשון – 10 דקות לעצמך</h2>
            <p style={styles.paragraph}>
              ברגע שאתה עוצר – אתה שומע. <br />
              ברגע שאתה שומע – אתה חוזר לעצמך.
            </p>

            <h4 style={styles.paragraph}>🌬️ תרגול נשימה:</h4>
            <ul style={{ textAlign: "right" }}>
              <li>קח נשימה עמוקה</li>
              <li>החזק 3 שניות</li>
              <li>נשוף לאט</li>
              <li>עשה את זה 5 פעמים בקצב שלך</li>
            </ul>

            <h4 style={styles.paragraph}>🖊️ שאלת התבוננות:</h4>
            <p>מה אני מרגיש עכשיו?</p>
            <textarea
              style={{ width: "100%", minHeight: "80px", padding: "0.5rem", borderRadius: "8px" }}
              placeholder="כתוב כאן לעצמך..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            ></textarea>

            <button style={{ ...styles.button, marginTop: "1rem" }} onClick={() => alert("כל הכבוד שאתה כאן.")}>אני מוכן להמשיך למסע</button>
            {renderNavButtons()}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    direction: "rtl",
    fontFamily: "sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    textAlign: "center",
    color: "#222",
    position: "relative"
  },
  logoutBtn: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    backgroundColor: "#eee",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
  },
  paragraph: {
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#5c6ac4",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  },
  navButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "6px",
    marginTop: "0.25rem",
  },
};
