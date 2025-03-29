document.addEventListener("DOMContentLoaded", function () {
  // ダミーデータ
  const reservationData = {
    parasailing: {
      "2023-07-01": {
        "09:00": 2,
        "11:00": 4,
        "13:00": 1,
        "15:00": 3,
      },
      "2023-07-02": {
        "09:00": 5,
        "11:00": 3,
        "13:00": 2,
        "15:00": 0,
      },
    },
    snorkeling: {
      "2023-07-01": {
        "09:00": 3,
        "11:00": 2,
        "13:00": 4,
        "15:00": 1,
      },
      "2023-07-02": {
        "09:00": 2,
        "11:00": 5,
        "13:00": 3,
        "15:00": 4,
      },
    },
    jetski: {
      "2023-07-01": {
        "09:00": 1,
        "11:00": 1,
        "13:00": 2,
        "15:00": 0,
      },
      "2023-07-02": {
        "09:00": 1,
        "11:00": 2,
        "13:00": 0,
        "15:00": 2,
      },
    },
  };

  // アクティビティごとの最大人数設定
  const maxCapacity = {
    parasailing: 5,
    snorkeling: 8,
    jetski: 3,
  };

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ハンバーガーメニュー
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // メニュー項目がクリックされたらメニューを閉じる
    navMenu.querySelectorAll("a").forEach((item) => {
      item.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // 日付ピッカーの初期化（Flatpickr）
  const datePicker = document.getElementById("reservation-date");
  if (datePicker) {
    flatpickr(datePicker, {
      dateFormat: "Y年m月d日",
      minDate: "today",
      locale: {
        firstDayOfWeek: 0,
        weekdays: {
          shorthand: ["日", "月", "火", "水", "木", "金", "土"],
          longhand: [
            "日曜日",
            "月曜日",
            "火曜日",
            "水曜日",
            "木曜日",
            "金曜日",
            "土曜日",
          ],
        },
        months: {
          shorthand: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          longhand: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
      },
      disableMobile: true,
      onChange: function (selectedDates, dateStr, instance) {
        updateAvailability();
      },
    });
  }

  // アクティビティの選択肢変更でUIを更新
  const activitySelect = document.getElementById("activity-select");
  if (activitySelect) {
    activitySelect.addEventListener("change", function (e) {
      updateTimeOptions(this.value);
      updateAvailability();
    });
  }

  // 時間選択変更で予約可能状況を更新
  const timeSelect = document.getElementById("reservation-time");
  if (timeSelect) {
    timeSelect.addEventListener("change", function (e) {
      updateAvailability();
    });
  }

  // 人数選択変更で予約可能状況を更新
  const peopleSelect = document.getElementById("people");
  if (peopleSelect) {
    peopleSelect.addEventListener("change", function (e) {
      updateAvailability();
    });
  }

  // 時間選択肢の更新
  function updateTimeOptions(activity) {
    const timeSelect = document.getElementById("reservation-time");
    if (!timeSelect) return;

    // 現在の選択値を保存
    const currentValue = timeSelect.value;

    // 選択肢をリセット
    timeSelect.innerHTML = '<option value="">選択してください</option>';

    // アクティビティに応じて選択肢を追加
    if (activity === "parasailing") {
      const options = [
        { value: "09:00", text: "09:00" },
        { value: "11:00", text: "11:00" },
        { value: "13:00", text: "13:00" },
        { value: "15:00", text: "15:00" },
      ];

      options.forEach((option) => {
        const optElement = document.createElement("option");
        optElement.value = option.value;
        optElement.textContent = option.text;
        timeSelect.appendChild(optElement);
      });
    } else if (activity === "snorkeling") {
      const options = [
        { value: "10:00", text: "10:00" },
        { value: "13:00", text: "13:00" },
        { value: "15:30", text: "15:30" },
      ];

      options.forEach((option) => {
        const optElement = document.createElement("option");
        optElement.value = option.value;
        optElement.textContent = option.text;
        timeSelect.appendChild(optElement);
      });
    } else if (activity === "jetski") {
      const options = [
        { value: "09:30", text: "09:30" },
        { value: "11:30", text: "11:30" },
        { value: "14:00", text: "14:00" },
        { value: "16:00", text: "16:00" },
      ];

      options.forEach((option) => {
        const optElement = document.createElement("option");
        optElement.value = option.value;
        optElement.textContent = option.text;
        timeSelect.appendChild(optElement);
      });
    } else {
      // デフォルトの選択肢
      const options = [
        { value: "09:00", text: "09:00" },
        { value: "11:00", text: "11:00" },
        { value: "13:00", text: "13:00" },
        { value: "15:00", text: "15:00" },
      ];

      options.forEach((option) => {
        const optElement = document.createElement("option");
        optElement.value = option.value;
        optElement.textContent = option.text;
        timeSelect.appendChild(optElement);
      });
    }

    // 元の選択値を復元（存在すれば）
    if (currentValue) {
      const exists = Array.from(timeSelect.options).some(
        (opt) => opt.value === currentValue
      );
      if (exists) {
        timeSelect.value = currentValue;
      }
    }
  }

  // 予約状況を更新する関数
  async function updateAvailability() {
    const activitySelect = document.getElementById("activity-select");
    const reservationDate = document.getElementById("reservation-date");
    const timeSelect = document.getElementById("reservation-time");
    const peopleSelect = document.getElementById("people");
    const availabilityInfo = document.getElementById("availability-info");

    if (!activitySelect || !reservationDate || !timeSelect || !availabilityInfo)
      return;

    const activity = activitySelect.value;
    let dateStr = reservationDate.value;
    const timeStr = timeSelect.value;
    const peopleCount = peopleSelect.value ? parseInt(peopleSelect.value) : 0;

    // 日付文字列からYYYY-MM-DD形式を抽出
    if (dateStr) {
      const dateParts = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
      if (dateParts) {
        dateStr = `${dateParts[1]}-${dateParts[2].padStart(
          2,
          "0"
        )}-${dateParts[3].padStart(2, "0")}`;
      }
    }

    // フォームが十分に入力されているか確認
    if (!activity || !dateStr || !timeStr) {
      availabilityInfo.innerHTML = "予約情報を選択してください。";
      availabilityInfo.className = "availability-info info";
      return;
    }

    try {
      // APIを使用して予約状況を確認
      const availability = await ApiClient.checkAvailability(
        activity,
        dateStr,
        timeStr
      );

      // 予約可能かどうかをチェック
      if (!availability.available) {
        availabilityInfo.innerHTML =
          "申し訳ありません。この時間帯は予約が埋まっています。";
        availabilityInfo.className = "availability-info full";
        return;
      }

      if (peopleCount > availability.availableSpots) {
        availabilityInfo.innerHTML = `申し訳ありません。この時間帯は残り${availability.availableSpots}名様までご予約可能です。`;
        availabilityInfo.className = "availability-info warning";
        return;
      }

      availabilityInfo.innerHTML = `この時間帯は予約可能です（残り${availability.availableSpots}名様）`;
      availabilityInfo.className = "availability-info available";
    } catch (error) {
      console.error("予約状況確認エラー:", error);
      availabilityInfo.innerHTML = "予約状況の確認中にエラーが発生しました。";
      availabilityInfo.className = "availability-info error";
    }
  }

  // 予約フォーム送信処理
  const reservationForm = document.getElementById("reservation-form");

  if (reservationForm) {
    reservationForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // フォームデータの取得
      const formData = new FormData(this);

      // バリデーション
      const availabilityInfo = document.getElementById("availability-info");
      if (availabilityInfo && availabilityInfo.classList.contains("full")) {
        alert(
          "申し訳ありません。この時間帯は予約が埋まっています。他の時間帯をお選びください。"
        );
        return;
      }

      if (availabilityInfo && availabilityInfo.classList.contains("warning")) {
        alert(
          "申し訳ありません。選択された人数での予約はできません。人数を減らすか、他の時間帯をお選びください。"
        );
        return;
      }

      // 予約データの準備
      const activitySelect = document.getElementById("activity-select");
      const reservationDate = document.getElementById("reservation-date");
      const reservationTime = document.getElementById("reservation-time");

      // 日付文字列からYYYY-MM-DD形式を抽出
      let dateStr = reservationDate.value;
      if (dateStr) {
        const dateParts = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
        if (dateParts) {
          dateStr = `${dateParts[1]}-${dateParts[2].padStart(
            2,
            "0"
          )}-${dateParts[3].padStart(2, "0")}`;
        }
      }

      const reservationData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        activity_id: formData.get("activity"),
        date: dateStr,
        time: formData.get("time"),
        participants: parseInt(formData.get("people")),
        hotel: formData.get("hotel"),
        message: formData.get("message"),
      };

      try {
        // APIを使用して予約を作成
        const response = await ApiClient.createReservation(reservationData);

        // 成功時の処理
        const activity =
          activitySelect.options[activitySelect.selectedIndex].text;
        const message = `${reservationData.name}様、予約を受け付けました。\n\n【予約内容】\nアクティビティ: ${activity}\n日付: ${reservationDate.value}\n時間: ${reservationTime.value}\n人数: ${reservationData.participants}名\n\n予約確認メールを${reservationData.email}宛にお送りしました。ご確認ください。`;

        alert(message);

        // フォームをリセット
        reservationForm.reset();

        // 予約状況表示をリセット
        if (availabilityInfo) {
          availabilityInfo.innerHTML = "予約情報を選択してください。";
          availabilityInfo.className = "availability-info info";
        }

        // ページの先頭へスクロール
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        // エラー時の処理
        alert(`予約の作成中にエラーが発生しました: ${error.message}`);
      }
    });
  }

  // スクロール時のヘッダースタイル変更
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 100) {
      header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    }
  });

  // 要素のフェードインアニメーション
  const fadeElements = document.querySelectorAll(
    ".activity-item, .price-item, .faq-item, .instagram-item"
  );

  // Intersection Observerの設定
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = entry.target.classList.contains(
            "activity-item"
          )
            ? "translateY(0)"
            : "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // 各要素を監視
  fadeElements.forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = element.classList.contains("activity-item")
      ? "translateY(20px)"
      : "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(element);
  });

  // よくある質問の折りたたみ機能 (オプション)
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector("h3");
    const answer = item.querySelector("p");

    if (question && answer) {
      // 初期状態では回答を表示（コメントアウトすると折りたたみ状態からスタート）
      // answer.style.display = 'none';

      question.addEventListener("click", function () {
        // answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        // CSSトランジションを使用するにはこちらを使用
        /*
        if (answer.classList.contains('active')) {
          answer.classList.remove('active');
        } else {
          answer.classList.add('active');
        }
        */
      });
    }
  });

  // 初期化時に予約状況表示を設定
  updateAvailability();
});
