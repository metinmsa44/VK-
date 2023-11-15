//Event Tanımlandı. 

document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculateButton');
    const cleanButton = document.getElementById('clean');
    const clearHistoryButton = document.getElementById('clearHistory'); // Yeni eklenen buton
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiResult = document.getElementById('bmi');
    const resultMessage = document.getElementById('result');
    const passResultContainer = document.getElementById('passresult');


// Geçmiş hesaplamaları yerel depodan al veya hiç yoksa boş bir dizi başlatır.

    let pastCalculations = JSON.parse(localStorage.getItem('pastCalculations')) || [];

    displayPastCalculations(); // Web sayfasında geçmiş hesaplamaları göster.

    // Event listener for the "Calculate" button. Hesaplama düğmesi için olay 

    calculateButton.addEventListener('click', function () {
        calculateBMI();
    });
    // Event listener for the "Clean" button. Temizleme dügmesi
    cleanButton.addEventListener('click', function () {
        cleanInputs();
    });
  // Event listener for the "Clear History" button.Tümünü Temizleme
    clearHistoryButton.addEventListener('click', function () {
        clearPastCalculations();
    });
 // BMI hesaplamak için fonksiyon.
    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100;
  
       // Giriş değerlerinin geçerli olup olmadığını kontrol etmek için

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert('Lütfen geçerli bir ağırlık ve boy girin.');
            return;
        }
         

        // BMI hesapla, sonucu al, sonucu göster, hesaplamayı depola ve geçmiş hesaplamaları göster.
        const bmi = calculateBMIValue(weight, height);
        const result = getBMIResult(bmi);

        displayResult(bmi, result);
        storeCalculation(weight, height, bmi, result);
        displayPastCalculations();
    }
  

// BMI değerini hesaplamak için fonksiyon.
    function calculateBMIValue(weight, height) {
        return (weight / (height * height)).toFixed(2);
    }

    // BMI sonucu kategorisini belirlemek için fonksiyon

    function getBMIResult(bmi) {
        let bmiResult = "";

        if (bmi < 18.5) {
            bmiResult = "Zayıf";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            bmiResult = "Normal";
        } else if (bmi >= 25 && bmi <= 29.9) {
            bmiResult = "Fazla Kilolu";
        } else if (bmi >= 30 && bmi <= 34.9) {
            bmiResult = "1. Derece Obezite";
        } else if (bmi >= 35 && bmi <= 39.9) {
            bmiResult = "2. Derece Obezite";
        } else {
            bmiResult = "3. Derece Obezite";
        }

        return bmiResult;
    }
    // BMI sonucunu web sayfasında göstermek için fonksiyon.

    function displayResult(bmi, result) {
        bmiResult.textContent = bmi;
        resultMessage.textContent = result;
    }

    // Giriş alanlarını temizlemek için fonksiyon.

    function cleanInputs() {
        weightInput.value = '';
        heightInput.value = '';
        bmiResult.textContent = '0';
        resultMessage.textContent = 'N/A';
    }
   
    // Mevcut hesaplamayı yerel depoda saklamak için fonksiyon.

    function storeCalculation(weight, height, bmi, result) {
        const calculation = {
            weight: weight,
            height: height,
            bmi: bmi,
            result: result,
            date: new Date().toLocaleString(),
        };
  

        pastCalculations.push(calculation);
        localStorage.setItem('pastCalculations', JSON.stringify(pastCalculations));
    }
         // Web sayfasında geçmiş hesaplamaları göstermek için fonksiyon.
    function displayPastCalculations() {
        passResultContainer.innerHTML = '';
        pastCalculations.forEach((calculation) => {
            const calculationDiv = document.createElement('div');
            calculationDiv.textContent = `Tarih: ${calculation.date}, Ağırlık: ${calculation.weight} kg, Boy: ${calculation.height} cm, BMI: ${calculation.bmi}, Sonuç: ${calculation.result}`;
            passResultContainer.appendChild(calculationDiv);
        });
    }
  
 // Geçmiş hesaplamaları yerel depodan temizlemek için fonksiyon.

    function clearPastCalculations() {
        pastCalculations = [];
        localStorage.removeItem('pastCalculations');
        displayPastCalculations();
    }
});