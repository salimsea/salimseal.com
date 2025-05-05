import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { Modal, ModalBody } from "reactstrap";

var API_KEY = "AIzaSyD3ipLZmpWF011sVv4zmGH6AabmNHshjAU";

const SectionHero = ({ styles }) => {
  const [modal, setModal] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! Feel free to ask anything about *Salim Segaf Alqosam* whether it's about his work, experience, skills, or anything else you'd like to know 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (modal && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 2000);
    }
  }, [modal]);

  const toggleModal = () => {
    setModal(!modal);
    setTimeout(() => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setIsLoading(true);

      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
        });
        const chat = model.startChat({
          history: chatModels,
        });

        const finalPrompt = `
        Jawablah pertanyaan menggunakan bahasa yang sama dengan bahasa pertanyaan (misal: Indonesia, Inggris, Sunda, dll).
        Jika pertanyaan menanyakan tanggal atau waktu saat ini, anggap hari ini adalah ${new Date().getDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}.
        Hanya jawab jika pertanyaan berkaitan dengan Salim Segaf Alqosam (software engineer, Dotnet Developer @ SISI, pengalaman di Next.js, React Native, dan sejenisnya).
        Jika pertanyaan di luar topik atau tentang orang lain, jawab: "I can only answer questions about Salim Segaf Alqosam. 😔"
        Jangan gunakan kalimat seperti 'Dari informasi yang saya miliki', langsung jawab ke intinya saja tanpa basa-basi.
        Pertanyaan: ${input}
        `;
        const result = await chat.sendMessage(finalPrompt);

        const response = (await result.response) || "No response received.";
        const text = response.text();

        setMessages((prev) => [...prev, { sender: "bot", text: text }]);
      } catch (error) {
        console.error("Error communicating with Gemini AI:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, I couldn't process your request. 😔" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (!isLoading)
      if (e.key === "Enter") {
        if (!modal) toggleModal();
        handleSendMessage();
      }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessage = (text) => {
    const pattern = /(\*.*?\*)|(https?:\/\/\S+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      if (match[1]) {
        parts.push(<strong key={parts.length}>{match[1].slice(1, -1)}</strong>);
      } else if (match[2]) {
        parts.push(
          <a
            key={parts.length}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="alink"
          >
            {match[2]}
          </a>
        );
      }
      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

  return (
    <section className={styles["hero"]}>
      <div className="container" data-aos="fade-down">
        <div className="d-flex align-items-center">
          <span className={`${styles.garis} d-none d-sm-block`}></span>
          <h1>
            Fullstack <span>Developer</span>
          </h1>
        </div>
        <p>
          I’am a front-end designer & back-end developer <br />
          From Indonesia 🇮🇩
        </p>
        <div className={styles["hero-input"]}>
          <div className={styles["input-container"]}>
            <label className={styles["input-label"]}>USE AI 🤖</label>
            <input
              type="text"
              placeholder="Ask something about Salim..."
              className={styles["input-modern"]}
              value={modal ? "" : input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className={styles["btn-icon"]}
              onClick={() => {
                toggleModal();
                handleSendMessage();
              }}
            >
              Ask ✨
            </button>
          </div>
        </div>
      </div>

      {/* Modal Chat */}
      <Modal centered size="md" isOpen={modal} toggle={toggleModal}>
        <ModalBody className={styles["chat-modal"]}>
          <div className={styles["chat-header"]}>
            <h5>Chat with AI ✨</h5>
            <button className={styles["close-btn"]} onClick={toggleModal}>
              ✖
            </button>
          </div>
          <div className={styles["chat-body"]} ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles["chat-message"]} ${
                  msg.sender === "user" ? styles["user"] : styles["bot"]
                }`}
              >
                {formatMessage(msg.text)}
              </div>
            ))}
            {isLoading && (
              <div className={styles["chat-message"] + " " + styles["bot"]}>
                <FaSpinner style={{ animation: "spin 2s linear infinite" }} />{" "}
                Typing...
              </div>
            )}
          </div>
          <div className={styles["chat-footer"]}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              ref={inputRef}
              autoFocus
              className={styles["chat-input"]}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className={styles["send-btn"]}
            >
              {isLoading ? (
                <FaSpinner style={{ animation: "spin 2s linear infinite" }} />
              ) : (
                <>
                  Send{" "}
                  <FaPaperPlane
                    size={12}
                    color="#fff"
                    style={{ marginLeft: 3, marginBottom: 2 }}
                  />
                </>
              )}
            </button>
          </div>
          <p className={styles["chat-disclaimer"]}>
            ⚠️ The answers about <u>Salim Segaf Alqosam</u> are generated by AI
            based on available data and chat history. The AI may provide
            information that is incomplete or not entirely accurate. Please
            double-check any important details.
          </p>
        </ModalBody>
      </Modal>
    </section>
  );
};

const chatModels = [
  {
    role: "user",
    parts: [{ text: "Sekarang tanggal berapa?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: `Hari ini hari ${new Date().toLocaleString('id-ID', { weekday: 'long' })}, tanggal ${new Date().getDate()} ${new Date().toLocaleString('id-ID', { month: 'long' })} ${new Date().getFullYear()}.`
      }
    ]
  },
  {
    role: "user",
    parts: [{ text: "Siapa Salim Segaf Alqosam?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: `
          Salim Segaf Alqosam adalah seorang Software Engineer asal Indonesia yang lahir di Jakarta pada 29 Juli 2001 dan saat ini berdomisili di Bogor, Jawa Barat. Pada tahun ${new Date().getFullYear()}, Salim berusia ${new Date().getFullYear() - 2001} tahun. Ia merupakan lulusan S1 Sistem Informasi dari Universitas Binaniaga Indonesia (UNBIN) dengan IPK 3.68 dan telah diwisuda pada 24 Februari 2025. Salim juga memegang sertifikasi profesional BNSP sebagai Certified Web Developer (CWDev) yang berlaku hingga 2027.
          Salim memiliki pengalaman lebih dari lima tahun dalam pengembangan aplikasi web dan mobile. Saat ini, ia bekerja sebagai Programmer .NET Developer di PT. Sinergi Informatika Semen Indonesia (SISI) sejak Juli 2024, dengan fokus pada pengembangan aplikasi berbasis .NET Framework dan SQL Server, serta integrasi SAP ke dalam Sistem Informasi Talenta (SINTA) perusahaan. Sebelumnya, Salim berkarir di PT. Sawerigading Multi Kreasi (April 2019-Juli 2024), berkembang dari Junior Programmer menjadi Software Engineer. Di sana, ia terlibat dalam pengembangan aplikasi Next.js, .NET 5-8, React Native, desain sistem, DevOps, dan manajemen server.
          Selain pekerjaan utamanya, Salim juga aktif mengambil proyek paruh waktu. Ia pernah menjadi Software Engineer di Badan Koordinasi Penanaman Modal (BKPM) pada tahun 2023, mengembangkan aplikasi web Potensi Investasi Daerah (PIR) dengan GatsbyJS, C# .NET 5, serta integrasi ArcGIS dan GeoServer. Ia juga menjadi Fullstack Developer untuk Dropshipedia (2019-2023), membangun platform web dan mobile dari awal, mulai dari desain ERD, proses bisnis, hingga fitur-fitur kompleks seperti e-learning, shopping, chat real-time, notifikasi, autentikasi, integrasi pembayaran, dan resi otomatis.
          Keahlian teknis Salim meliputi backend (C#, ASP.NET, .NET Core, PHP), frontend (JavaScript, ReactJS, NextJS, React Native, HTML, CSS), database (PostgreSQL, MySQL, SQL Server), serta DevOps dan infrastruktur (Linux, Windows Server, Docker, Jenkins, Zabbix, Liquibase, Nginx, Apache, GCP, VMware). Ia terbiasa menggunakan berbagai tools pengembangan dan desain seperti Visual Studio, VS Code, Android Studio, Figma, dan Adobe Photoshop.
          Salim juga aktif dalam penelitian di bidang Sistem Informasi, khususnya terkait penerapan metode TOPSIS untuk rekomendasi produk dropship dan pengembangan Sistem Informasi E-Presensi. Salah satu publikasinya dapat diakses di TeknoIS: Jurnal Ilmiah Teknologi Informasi dan Sains UNBIN.
          Secara pribadi, Salim dikenal sebagai pemecah masalah yang handal, kolaboratif, antusias mempelajari teknologi baru, serta memiliki kemampuan komunikasi yang baik dalam Bahasa Indonesia dan Bahasa Inggris tingkat menengah. Ia dapat dihubungi melalui WhatsApp di 0821-1223-5774 atau melalui portofolio daring di salimsea.netlify.app. Informasi lebih lanjut dan dokumen CV tersedia di https://s.id/cv-salim-segaf-alqosam.
          Salim juga aktif di berbagai media sosial profesional dan kreatif berikut:
          LinkedIn: https://www.linkedin.com/in/salimsea/
          GitHub: https://github.com/salimsea
          Facebook: https://www.facebook.com/salimsea
          Instagram: https://www.instagram.com/salimseal
          X (Twitter): https://x.com/salimsea
          Dribbble: https://dribbble.com/salimsea
          Behance: https://www.behance.net/salimsaseasasa
        `,
      },
    ],
  },
];

export default SectionHero;
