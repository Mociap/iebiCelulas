import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin

def analyze_page(url):
    # Fazer a requisição HTTP
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    response = requests.get(url, headers=headers)
    
    # Verificar se a requisição foi bem-sucedida
    if response.status_code != 200:
        print(f"Erro ao acessar a página: {response.status_code}")
        return
    
    # Criar o objeto BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Analisar componentes
    analyze_banners(soup, url)
    analyze_carousels(soup)
    analyze_containers(soup)

def analyze_banners(soup, base_url):
    banners = soup.find_all(['div', 'section'], class_=re.compile(r'banner|hero'))
    print(f"Número de banners encontrados: {len(banners)}")
    
    for i, banner in enumerate(banners, 1):
        print(f"Banner {i}:")
        
        # Verificar dimensões do próprio banner
        style = banner.get('style', '')
        width = re.search(r'width:\s*(\d+)px', style)
        height = re.search(r'height:\s*(\d+)px', style)
        
        if width and height:
            print(f"  Dimensões do contêiner: {width.group(1)}x{height.group(1)}px")
        else:
            print("  Dimensões do contêiner não encontradas no estilo inline")
        
        # Procurar por imagens dentro do banner
        images = banner.find_all('img')
        for j, img in enumerate(images, 1):
            print(f"  Imagem {j}:")
            src = img.get('src')
            if src:
                full_src = urljoin(base_url, src)
                print(f"    URL: {full_src}")
            
            # Tentar obter dimensões da imagem
            width = img.get('width')
            height = img.get('height')
            if width and height:
                print(f"    Dimensões: {width}x{height}")
            else:
                print("    Dimensões não especificadas no HTML")
            
            # Verificar style da imagem
            style = img.get('style', '')
            width_style = re.search(r'width:\s*(\d+)px', style)
            height_style = re.search(r'height:\s*(\d+)px', style)
            if width_style and height_style:
                print(f"    Dimensões no estilo: {width_style.group(1)}x{height_style.group(1)}px")

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
    url = "https://central.online"
    analyze_page(url)
