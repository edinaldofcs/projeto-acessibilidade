# Projeto de acessibilidade para pessoas com limitações de movimentos

[Link do projeto](https://edinaldofcs.github.io/projeto-acessibilidade/)

Utilizando API de reconhecimento facial, <a href = "https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection">face-landmarks-detection</a>, estou construindo este editor de textos que tem como finalidade, ajudar pessoas com dificuldade comunicação e locomoção. 

<div style="width: 500px; height: 250px;">
<img src = "https://user-images.githubusercontent.com/61365646/222906334-612b52fa-7b02-4216-aa6b-f65becf2dd34.png" style="width: 500px; height: 250px; margin: 0 auto;"/>
</div>

Até o presente momento, estou utilizando os seguintes pontos:
<div style="width: 500px; height: 250px;">
<img src = "https://user-images.githubusercontent.com/61365646/222906988-5e4b3b0d-c3ea-4682-8960-fc09cda1e021.png"/>
</div>

algumas variaveis de configuração de sensibilidade, foram definidas de acordo com preferencias pessoais

- O ponto Nº 6, foi utilizado como ponteiro do mouse e seu cálculo ficou da seguinte forma:
```javascript
 top = (altura_da_tela / 2)  - (altura_da_tela * (4 * (0.5 + ponto_6_y) * -1 * nivel_de_sensilibidade))
 left = (largura_da_tela / 2)  - (largura_da_tela * (4 * (0.5 + ponto_6_y) * -1 * nivel_de_sensilibidade))
```

obs: há um ponto central na tela e o usuário deve posicionar o ponto da face com este ponto para fazer a devida calibração.

- os pontos `0` e `17`, são referentes aos lábios, siperiores e inferiores, e o cálculo para definir a abertura da boca, foi somente a distância em `Y`

+ Os pontos para a abertura e/ou fechamento dos olhos, segue a mesma lógica, já estão identificados, porém falta implementar o 'clique', que deverá ser da seguinte forma:
  + dois olhos: - desce uma linha;
  + olho direito - passa para a proxima coluna; e
  + olho esquerdo - "clica" nos botões


## Exemplo de utilização (a abertura da boca está simulando o evento de clique)
![hitpaw-1677901007014](https://user-images.githubusercontent.com/61365646/222908290-bca4df4e-b687-4fb1-9e1a-03ba4de0002f.gif)

