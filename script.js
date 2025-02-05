function markCompleted(taskId) {
  const button = document.querySelector(
    `[onclick="markCompleted('${taskId}')"]`
  );
  if (button) {
    button.classList.add("completed");
    button.textContent = "Выполнено";
    button.disabled = true;
    localStorage.setItem(taskId, "completed");
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
  updateProgressBar("progress-week3", 3);
});
