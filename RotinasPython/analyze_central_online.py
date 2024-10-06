import requests
from bs4 import BeautifulSoup
import re

def analyze_page(url):
    # Fazer a requisição HTTP
    response = requests.get(url)
    
    # Verificar se a requisição foi bem-sucedida
    if response.status_code != 200:
        print(f"Erro ao acessar a página: {response.status_code}")
        return
    
    # Criar o objeto BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Analisar componentes
    analyze_banners(soup)
    analyze_carousels(soup)
    analyze_containers(soup)

def analyze_banners(soup):
    banners = soup.find_all('div', class_=re.compile(r'banner|hero'))
    print(f"Número de banners encontrados: {len(banners)}")
    
    for i, banner in enumerate(banners, 1):
        print(f"Banner {i}:")
        # Tentar obter as dimensões do banner
        style = banner.get('style', '')
        width = re.search(r'width:\s*(\d+)px', style)
        height = re.search(r'height:\s*(\d+)px', style)
        
        if width and height:
            print(f"  Dimensões: {width.group(1)}x{height.group(1)}px")
        else:
            print("  Dimensões não encontradas no estilo inline")

def analyze_carousels(soup):
    carousels = soup.find_all('div', class_=re.compile(r'carousel|slider'))
    print(f"\nNúmero de carrosséis encontrados: {len(carousels)}")
    
    for i, carousel in enumerate(carousels, 1):
        print(f"Carrossel {i}:")
        items = carousel.find_all('div', class_=re.compile(r'item|slide'))
        print(f"  Número de itens: {len(items)}")

def analyze_containers(soup):
    containers = soup.find_all('div', class_=re.compile(r'container|section'))
    print(f"\nNúmero de contêineres/seções encontrados: {len(containers)}")
    
    for i, container in enumerate(containers, 1):
        print(f"Contêiner/Seção {i}:")
        print(f"  Conteúdo: {container.get_text()[:50]}...")  # Primeiros 50 caracteres

if __name__ == "__main__":
    url = "https://central.online/celulas/area-do-lider/licoes-de-celula/"
    analyze_page(url)
