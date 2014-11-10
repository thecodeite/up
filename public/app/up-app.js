var app = angular.module('upApp', [])

app.controller('MainCtrl', function($scope, $timeout, $http){
  $scope.isUp = "Checking..."
  $scope.delay = 0

  var update = function(){
    console.log("Waiting ", $scope.delay, " until update")

    $scope.delay--;

    if($scope.delay <= 0) {
      $scope.delay = 5

      $http.get('/up')
        .success(function() {
          $scope.isUp = "Up!";
          $scope.faviconUrl = '/images/up-favicon.ico'
        })
        .error(function() {
          $scope.isUp = "Internet down :(";
          $scope.faviconUrl = 'data:image/png;base64,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5Zdf5t5P/e37ql9//XV46qmnwkknnRRWWmkll89ADbRu3Tp3O+uwYcNylzb98MMPv1u/pkyZEj7++ONw6623hj322CN3hry2K+4Djfvuu68ge88NN9ygTSmmKcmD91IF/vM1OMVw2WWXFSzwDxw4UJvWUnJGdXK7cV1Pr/jss8/COeeck/sFQHvCr/Xp0yeMHDkyF+br8kFo8sd1sq75da04kl9W3nnnnXrvPRMnTvTLMsXWr1SB/1mNTTGesBTqxITkqZg2rbkuXbqEiy66qGAfr02aNCn337fQQgtpXwT9GPRHjRpVsIcZ7733Xthnn31y95Vo38Lq0aNHGDduXL37aKeddtKeFNO5RQ/8sZpHUzU2xTgtoRCVvGbSqVMnbVoDjRs3zr22U8hTKn5ZP/30UzjggAO0NVVp4YUXDg888EAoViWvAyWv0mnrwkrewf/tK4y1rdtuu01bUkyvlCLw/0FDUwzHHntsQTbBbbbZRnvWwBJLLJF7P78Uddddd/kjjKqy7bbb5r4jKnZNnTo1HH/88aFhw4bavYCOO+64evXLd99955smimlm1KHYgX+whqYY7r333npvftddd522rIHdd989TJgwIZSykg9/+/fvr/2paMm721deeWUodT3++OO5V/P0QeEkRzrXp5ZbbjntSDFtUuzAf7tGphivltQ3gH766aeOs6uBU045JZSrkp/JDzroIP1ARZp33nnDc889V7b59cEHH4Qll1xSXxRIixYt6nXr+4EHHqgdKaaTix34v9TIFNoaa6xR782uX79+2nIuLrjggpCGOvnkk/UHFWX++ecPr776atnn1ldffRVWXnllfVIgyb0jdTlVyaWPlMA9RQv8sRbTwBRD8g5qfSr5CV07zl7yfu9VV10V0lSXXHKJd1ypmI9z33777dTMrfHjx4e+ffvqmwIZPHhwnX911n4U0XfFDPw7a2CK4fbbb6/z5vbhhx/mLrLRjrOXtrD//2vIkCH6h0xL7pxIXqVJWyVnwffu3VsfFeiBSfKNRF2qa9eu2pBiWqpYgf8SjUsxjBkzpk6L6cyZM8N6662nDefg6KOPDmmuPffcUz+R2Xe8n3322dTOreQivOTXB31VmFPNkmOGa1vJHQzajyLatViB/wWNS6ElF279/PPPddrQhg8frg3nYKuttqr3edKlOFbQ6wdkTfI62i233BLSXslHp34BLYyDDz641u2fnIim7SiivxY88MdqGU3TuBRa9+7d63ybq5tcZ2/FFVfM/ayfhfrhhx9yN1zqN7LiL3/5S8hK3X333bkHK/qt/n/kPfTQQw4oIE2eL0bgX0/DUgzJ6Tp1qdNOO037zUa7du3Cxx9/HLJU77zzTmjVqpX+I/WSy/2yVqeffrq+K4Dknfxx48bVuN2vvfZa7UYxJQ/iWxQ68B+vYSmGQYMG1ekSJz9Tz15yAVkW6/LLL9d/pFrnzp3D119/nbm5lbzat/baa+vDAki+O6ppjRo1SptRbGsXOvDfpVEphuRJfW1rv/3203azsf3224cs16abbqofSa077rgjs3Pr/fff96CkQO66664atfkbb7yhvSi2owod+L/RqBTDueeeW6tN6/XXX/c+6mx06dIlfPvtt5kO/F988UXo2LGj/iR19thjj5D1cmdJYSTHsSbfHtVkv9JeFNmIggX+WEtqUIoluYCpNuVG3dm79957QyVUcvqJ/iRNunXrVqt3t9Ncm222mT4tgJocefzKK69oK4rtk0IG/t00KMUybNiwGm9UDzzwgDabjQEDBoRKqg033FC/khq33XZbxcyt5NWeZs2a6dd6Strwo48+muuxqNqKEliwUIH/Mo1Jsdxwww01/uhs+eWX12az2XiSG4crqZInY8kNl/qXcksuT6q0OuaYY/RtAQwcOHCO7fz8889rJ0phm0IF/hc1JsVy66231miDSn4J0F6zduyxx4ZKrH322Uf/UlbJ2esvvPBCxc2t5PWk5MQhfVzc8fHMM89oJ0rhrHoH/liNoskak2JJbsudWyU38S644ILaaxaSTbtS3i2e1Qe8ThXBh7rFqSuuuEIfF8D6668/2zZOLj3TRpTAo4UI/EtpSIopuRBmbvX3v/9dW81GsmlXciU3mupnyiG5CO6zzz6r2Lk1ffr00KtXL31dACNHjpxlG5933nnah1KYmDygr2/g305DUkyHHnroXDem3r17a6tZ6N69e27TruSaNGlS7rhR/U2pHXfccaHS67777tPXBdCzZ89ZrsXujKGElqlv4D9ZI1JM22233Rw3pEcffVQ7zUby9Kga6swzz9TflFRy18cnn3xSFfPLA5XCuOqqq37XtskH39qGEtm+voF/hEakmNZaa605bkZbb721dpqFli1bhu+//74qAsmP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xgI/pNCLL74oVdSjkj+YjCNmpUePHiZIPWvPPfc0liBbOgv8kEIu3apfvfTSS8YRs7TqqquaIPWsQYMGGUuQLcsI/JBCX331lVRRj0r+YDKOmJUNNtjABKlnnXDCCcYSZMvaAj+k0OTJk6WKelTyB5NxxKxsvfXWJkg966yzzjKWIFu2FPghZRo3bixR1LMmTZpkLDFLu+66qwlSz7r00kuNJciWPQV+SJl5551XoihAJX84GU/8VnIpm6pfXX/99cYSZMtRAj+kTLdu3SSKAlSHDh2MJ37nuOOOMznqWXfeeaexBNlyusAPKdOrVy+JogC1yCKLGE/8zpAhQ0yOetYjjzxiLEG2XCHwQ8qstdZaEkUBqmfPnsYTvzN06FCTo5713HPPGUuQLSMEfkiZfv36SRQFqDXXXNN44neGDx9uctSz3n77bWMJsuURgR9SZocddpAoClAbb7yx8cTv3HrrrSZHPevzzz83liBbXhb4IWX22msviaIAtd122xlP/M6DDz5octSzJkyYYCxBtowV+CFlDj/8cImiALXHHnsYT/zO008/bXLUs2bOnBkaNmxoPEF2TBT4IWVOPPFEiaIAddhhhxlP/M6YMWNMjgJU27ZtjSfIjukCP6TM6aefLk0UoAYPHmw88TsffPCByVGA6tSpk/EE2dJQ4IcU+eMf/yhNFKAOOugg44nfee2110yOAlTLli2NJ8iWFgI/pMghhxwiTRSgdt11V+OJ33niiSdMjnrW9OnTjSXInnYCP6TIbrvtJlEUoLbeemvjid+57777TI561o8//mgsQfZ0EvghRbbZZhuJogDVt29f44nfGTFihMlRz/rkk0+MJciehQR+SJENNthAoihArbrqqsYTv3P11VebHPWs5KQjYwkyZzGBH1IkCaqq/tWjRw/jid+58MILTY56VnKXgbEEmdND4IcUWXrppSWKAtSCCy5oPPE7p512mslRz3rggQeMJcie5QV+SJEuXbpIFAWoNm3aGE/8TnI/g6pf3XrrrcYSZM8qAj+kSOvWrSWKetbMmTNDgwYNjCd+54ADDjBB6lnDhw83liB71hL4IWVmzJghVdSjxo8fbxwxSwMHDjRB6llDhw41liB71hP4IWWSc65V3euzzz4zjpilLbbYwgSpZw0ZMsRYguzZWOCHlEnOuVZ1r7feess4YpbWW289E6Se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'
        })

    }

    $timeout(update, 1000)
  }

  $timeout(update, 1000)
})
