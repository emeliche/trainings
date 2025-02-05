function toggleWeek(weekId) {
  const weekContent = document.getElementById(`${weekId}-content`);
  if (weekContent) {
    weekContent.classList.toggle("expanded");
  }
}

function toggleCompleted(trainingId, progressBarId, totalTrainings) {
  const button = document.querySelector(
    `[onclick="toggleCompleted('${trainingId}', '${progressBarId}', ${totalTrainings})"]`
  );
  const progressBar = document.getElementById(progressBarId);

  if (button && progressBar) {
    if (button.classList.contains("completed")) {
      // Снимаем отметку
      button.classList.remove("completed");
      button.textContent = "Отметить выполненной";
      localStorage.removeItem(trainingId);
    } else {
      // Отмечаем выполненной
      button.classList.add("completed");
      button.textContent = "Выполнено";
      localStorage.setItem(trainingId, "completed");
    }

    // Обновляем прогресс-бар
    updateProgressBar(progressBarId, totalTrainings);
  }
}

function updateProgressBar(progressBarId, totalTrainings) {
  const progressBar = document.getElementById(progressBarId);
  if (progressBar) {
    // Считаем количество выполненных тренировок
    const completedTrainings = document.querySelectorAll(
      `[onclick*="${progressBarId}"].completed`
    ).length;
    // Вычисляем процент выполнения
    const progressPercent = (completedTrainings / totalTrainings) * 100;
    // Обновляем прогресс-бар
    progressBar.style.width = `${progressPercent}%`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Скрываем контент всех недель по умолчанию
  const weekContents = document.querySelectorAll(".week__content");
  weekContents.forEach((content) => {
    content.classList.add("collapsed");
  });

  // Восстанавливаем состояние кнопок и прогресс-баров
  const buttons = document.querySelectorAll(".week__button");
  buttons.forEach((button) => {
    const trainingId = button.getAttribute("onclick").match(/'([^']+)'/)[1];
    if (localStorage.getItem(trainingId) === "completed") {
      button.classList.add("completed");
      button.textContent = "Выполнено";
    }
  });

  // Обновляем прогресс-бары
  updateProgressBar("progress-week1", 3);
  updateProgressBar("progress-week2", 3);
  updateProgressBar("progress-week3", 3);
  updateProgressBar("progress-week4", 3);
});
