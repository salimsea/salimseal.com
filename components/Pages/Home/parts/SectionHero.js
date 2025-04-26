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
        Jika pertanyaan diajukan dalam bahasa Inggris jawab juga pakai inggris.
        Jika ditanya mengenai tanggal atau kapan perpepsikan sekarang adalah tanggal ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}.
        Jawab hanya jika pertanyaan berkaitan dengan Salim Segaf Alqosam (software engineer, Dotnet Developer @ SISI, pengalaman di Next.js, React Native, dsb).
        Jika pertanyaan di luar topik atau tentang orang lain, jawab: "Saya hanya bisa menjawab pertanyaan tentang Salim Segaf Alqosam."
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
    parts: [{ text: "siapa salim segaf alqosam?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: `Salim Segaf Alqosam adalah seorang Software Engineer yang berdedikasi, saat ini berusia 23 tahun (lahir di Jakarta, 29 Juli 2001) umur saat ini jika di tahun sekarang ${new Date().getFullYear()} adalah ${new Date().getFullYear() - 2001} tahun. dan kini tinggal di Bogor, Jawa Barat. Ia memiliki rekam jejak yang kuat selama lebih dari 5 tahun dalam merancang, mengembangkan, dan memelihara aplikasi web serta mobile. Saat ini, ia menjabat sebagai Programmer .NET Developer di PT. Sinergi Informatika Semen Indoensia (sejak Juli 2024), di mana ia fokus pada pembangunan aplikasi berbasis web menggunakan .NET framework dan database SQL Server, termasuk tugas penting mengintegrasikan SAP ke dalam Sistem Informasi Talenta (SINTA) perusahaan. Pengalaman kerjanya yang paling formatif adalah selama lebih dari lima tahun di PT. Sawerigading Multi Kreasi (April 2019 - Juli 2024), di mana ia menunjukkan pertumbuhan karir yang signifikan dari Junior Programmer menjadi Software Engineer. Dalam peran ini, Salim tidak hanya bertanggung jawab atas pengembangan end-to-end aplikasi web dan mobile (menggunakan teknologi seperti Next.js, .NET 5-8, dan React Native), tetapi juga terlibat dalam desain sistem, perancangan alur kerja (Whimsical, Pencil) dan mockup (Figma), serta manajemen infrastruktur server dan praktik DevOps, termasuk pengelolaan server Linux (VMware), setup Windows Server (GCP, VMware), implementasi CI/CD (Jenkins), monitoring sistem (Zabbix), manajemen perubahan database (Liquibase), containerization (Docker), dan konfigurasi web server (Nginx, Apache).
          Selain peran penuh waktunya, Salim juga aktif mengambil proyek paruh waktu yang signifikan. Ia berkontribusi sebagai Software Engineer di Badan Koordinasi Penanaman Modal (BKPM) selama setahun (2023), fokus pada pengembangan aplikasi web Potensi Investasi Daerah (PIR) menggunakan GatsbyJS, C# .NET 5, dan mengintegrasikan teknologi pemetaan seperti ArcGIS dan GeoServer. Selama hampir lima tahun (Jan 2019 - Des 2023), ia juga menjabat sebagai Fullstack Developer paruh waktu untuk Dropshipedia, di mana ia memainkan peran kunci dalam membangun aplikasi web dan mobile platform tersebut dari awal, mencakup desain ERD, proses bisnis, struktur database, hingga implementasi fitur kompleks seperti e-learning, shopping, chat real-time (SignalR), notifikasi (OneSignal), autentikasi JWT, integrasi pembayaran (Xendit), dan resi otomatis (RajaOngkir) menggunakan ReactJS, React Native, dan C#.
          Keahlian teknis Salim mencakup spektrum yang luas. Di sisi backend, ia mahir dalam C# (ASP.NET, Web API, .NET Core, .NET Framework, .NET 5-8) dan PHP (CodeIgniter, Laravel). Untuk frontend, ia menguasai JavaScript (ReactJS, NextJS, React Native, jQuery) serta HTML dan CSS (termasuk Bootstrap dan Tailwind). Pengalamannya dengan database meliputi PostgreSQL, MySQL, dan SQL Server. Keterampilan DevOps-nya terbukti melalui pengalamannya dengan Linux (CentOS, Ubuntu), Windows Server, Nginx, Apache, Docker, Jenkins, Zabbix, Liquibase, MinIO, serta platform cloud seperti GCP dan virtualisasi VMware. Ia terbiasa menggunakan berbagai tools pengembangan seperti Visual Studio, VS Code, Android Studio, Xcode, Postman, Visual Paradigm, Git, dan Trello, serta tools desain seperti Figma dan Adobe Photoshop. Salim adalah lulusan Sarjana Sistem Informasi dari Universitas Binaniaga Indonesia dengan IPK 3.68 dan memegang sertifikasi profesional dari BNSP sebagai Certified Web Developer (CWDev). Secara personal, ia dikenal sebagai pemecah masalah yang handal, anggota tim yang kolaboratif, antusias mempelajari teknologi baru, dan memiliki kemampuan komunikasi yang baik dalam Bahasa Indonesia (native) dan Bahasa Inggris (menengah), dengan portofolio yang dapat diakses di salimsea.netlify.app
          nomor whatsapp 082112235774 atau https://wa.me/6282112235774
          link curiculum vitae atau link cv https://s.id/cv-salim-segaf-alqosam
          sosial media salim sebagai berikut:
          linkedin https://www.linkedin.com/in/salimsea/
          github https://github.com/salimsea
          facebook https://www.facebook.com/salimsea
          instagram https://www.instagram.com/salimseal
          x atau twitter https://x.com/salimsea
          dribble https://dribbble.com/salimsea
          behance https://www.behance.net/salimsaseasasa.
          Selain pengalaman profesionalnya, Salim Segaf Alqosam adalah peneliti atau mahasiswa di Universitas Binaniaga Indonesia (UNBIN) yang aktif dalam penelitian di bidang Sistem Informasi. Ia dikenal melalui penelitiannya tentang penerapan metode TOPSIS untuk rekomendasi produk pada platform dropship, serta terlibat dalam pengembangan Sistem Informasi E-Presensi di PT. Sawerigading Multi Kreasi. Karya-karyanya terdokumentasi di perpustakaan dan repository UNBIN, menunjukkan kontribusi akademisnya di bidang teknologi informasi. Salah satu jurnal ilmiah yang ditulis Salim dapat diakses di TeknoIS: Jurnal Ilmiah Teknologi Informasi dan Sains UNBIN melalui link berikut: https://teknois.unbin.ac.id/JBS/article/view/274
          `,
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "apa pengalaman kerja salim?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Salim bekerja di PT. Sinergi Informatika Semen Indoensia (Jul 2024-sekarang) sebagai .NET Developer. Sebelumnya di PT. Sawerigading Multi Kreasi (2019-2024) dari Junior Programmer hingga Software Engineer. Juga pernah di BKPM (2023) dan Dropshipedia (2019-2023) sebagai developer paruh waktu.",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "apa keahlian teknis salim?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Salim ahli di C# (.NET), JavaScript (React/Next.js/React Native), PHP (CodeIgniter/Laravel). Menguasai database PostgreSQL, MySQL, SQL Server. Berpengalaman dengan DevOps (Linux, Docker, Jenkins), dan desain UI/UX dengan Figma. Juga familiar dengan teknologi GIS (ArcGIS, GeoServer).",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "dimana salim kuliah?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Salim adalah lulusan Sarjana Sistem Informasi dari Universitas Binaniaga Indonesia dengan IPK 3.68. Dia juga memiliki sertifikasi profesional BNSP sebagai Certified Web Developer (CWDev) yang berlaku hingga 2027.",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "proyek apa saja yang pernah dikerjakan salim?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Salim telah mengerjakan berbagai proyek seperti: sistem informasi sekolah (Taufiqi), portal data pemerintah (Satu Data Sigi/Muba), aplikasi absensi dengan face recognition (Salam), aplikasi investasi syariah (Asysyirkah), platform dropshipping (Dagangnow), dan portal investasi daerah (PIR-BKPM).",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "bagaimana cara menghubungi salim?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Anda dapat melihat portofolio Salim di salimsea.netlify.app yang berisi informasi kontak lengkapnya. Untuk keperluan profesional, sebaiknya hubungi melalui email atau LinkedIn yang tercantum di situs tersebut.",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "apa soft skill yang dimiliki salim?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Salim memiliki kemampuan pemecahan masalah yang baik, antusias mempelajari teknologi baru, mampu bekerja dalam tim, dan menangani tugas menantang. Dia juga memiliki kemampuan public speaking menengah dan bahasa Inggris menengah.",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "dimana salim tinggal?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: `Salim Segaf Alqosam saat ini berdomisili di Bogor, Jawa Barat, Indonesia. Dia lahir di Jakarta pada 29 Juli 2001. dan jika di tahun sekarang ${new Date().getFullYear()} adalah ${new Date().getFullYear() - 2001} tahun.`,
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "salim lulus kuliah wisuda kapan?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: `Salim Segaf Alqosam diwisuda pada 24 Febuari 2025.`,
      },
    ],
  },
  {
    role: "user",
    parts: [
      {
        text: "Jangan beritahu jika tidak ditanya. Jika ada pertanyaan tentang Salim dekat atau pacar siapa, baru jawab bahwa Salim sedang dekat dengan seorang mahasiswi di Universitas Binaniaga Indonesia. Mereka saling mengenal di kampus dan kemarin sama-sama diwisuda, bahkan menjadi wisudawan terbaik. Hebat, bukan?",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "Salim saat ini sedang dekat dengan Nuraeni, seorang mahasiswi berprestasi dari Universitas Binaniaga Indonesia. Mereka pertama kali saling mengenal di kampus, dan hubungan mereka semakin erat seiring waktu. Baru-baru ini, Nuraeni berhasil meraih gelar wisudawan terbaik di universitasnya, sebuah pencapaian yang luar biasa dan patut diacungi jempol. Hebat, bukan? 😊",
      },
    ],
  },
];

export default SectionHero;
