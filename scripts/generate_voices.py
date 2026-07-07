import os
import json
import requests

# ==============================================================================
# CONFIGURAÇÕES DE API E VOZES
# ==============================================================================
# Escolha o serviço de sua preferência: "elevenlabs" ou "openai"
PROVIDER = "elevenlabs"  # "elevenlabs" ou "openai"

# Insira sua chave de API aqui ou defina a variável de ambiente correspondente
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY", "SUA_API_KEY_AQUI")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "SUA_API_KEY_AQUI")

# 1. MAPEAMENTO ELEVENLABS (IDs de Vozes sugeridos para pt-BR / Expressivos)
# Você pode substituir estes IDs pelos de sua preferência do Voice Library da ElevenLabs
ELEVENLABS_VOICES = {
    "narrator": "pNInz6obpgqjVWtJ45ng",  # Marcus - Voz de narração profissional e profunda
    "ishaan": "EXAVITQu4vr4xnSDxMaL",    # Bella ou voz infantil personalizada (Gigi/Glinda)
    "nikumbh": "AZnzlk1XvdvUeBnXmlld",   # Domi - Voz calorosa, entusiasmada e empática
    "strict": "N2l5iaCqiJD14Kx8yTWv",    # George - Voz severa, rígida, ideal para o professor autoritário
    "father": "ODq5zmih86Wj9AD6Hn65",    # Arnold - Voz firme, profunda e exigente
    "brother": "IKne3meq5aBk9saAMt7s",   # Charlie - Voz jovem de menino/adolescente
    "principal": "VR6AupYg3I4dm5v3vs9f", # Bill - Voz de senhor, formal e pausada
    "rajan": "bV5qZ46g2G0oT5eT4U4c",     # Liam - Voz jovem e amigável
    "turma": "EXAVITQu4vr4xnSDxMaL",     # Voz genérica (para falas em grupo)
}

# 2. MAPEAMENTO OPENAI (Vozes padrão disponíveis: alloy, echo, fable, onyx, nova, shimmer)
OPENAI_VOICES = {
    "narrator": "onyx",    # Voz masculina profunda
    "ishaan": "nova",      # Voz de tom mais alto, aproxima-se de uma criança
    "nikumbh": "alloy",    # Voz neutra e amigável
    "strict": "fable",     # Voz com tom dramático/narrativo
    "father": "echo",      # Voz firme
    "brother": "alloy",    # Voz jovem
    "principal": "onyx",   # Voz madura e formal
    "rajan": "alloy",      # Voz amigável
    "turma": "shimmer",    # Voz de grupo/feminina
}

# Diretório de saída para os arquivos de áudio
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "audio", "voices")

# ==============================================================================
# BANCO DE DADOS DE FALAS (Extraído de scenes.js)
# ==============================================================================
# Lista de cenas contendo a narração principal e diálogos adicionais
SCENES_DATA = {
    # Cenas de introdução e fechamento (apenas narração)
    "intro": [
        ("narrator", "A institucionalização do ensino e as barreiras no acesso à educação inclusiva. Quando a escola se organiza como uma instituição padronizada, com um único método, um único ritmo e uma única forma de avaliar, ela própria levanta obstáculos para quem aprende diferente. A partir do filme Como Estrelas na Terra, este curta observa como essas barreiras se erguem na trajetória de Ishaan, um menino com dislexia, e o que é preciso para derrubá-las.")
    ],
    "close": [
        ("narrator", "As barreiras à educação inclusiva são, antes de tudo, institucionais. Quando a escola padronizada, compara e segrega, é ela que ergue os obstáculos atitudinais, pedagógicos, estruturais e de acesso que impedem muitas crianças de aprender. Incluir não é consertar a criança, nem depender da sorte de um bom professor: é a instituição derrubar as próprias barreiras e garantir, como direito, o acesso de todas as crianças à educação.")
    ],
    
    # Cenas com falas de personagens e narrações correspondentes
    "wonder": [
        ("narrator", "Esse é o Ishaan. Um menino que enxerga o mundo cheio de cores."),
        ("ishaan", "Olha só... as estrelas!")
    ],
    "streets": [
        ("ishaan", "Olha aquela poça d'água... parece um espelho de cores!"),
        ("narrator", "Nas ruas, ele encontra o aprendizado que a escola rígida lhe nega.")
    ],
    "classroom": [
        ("strict", "Ishaan Awasthi! Fique de pé e leia a próxima frase!"),
        ("ishaan", "As letras... ficam dançando na minha frente."),
        ("turma", "Ahahaha! Ele não sabe ler! Que burro!"),
        ("strict", "Silêncio! Ishaan, leia direito! Por que você não presta atenção?"),
        ("narrator", "A dificuldade dele é tratada como preguiça ou indisciplina. A instituição ergue a barreira atitudinal.")
    ],
    "complaint": [
        ("principal", "O Ishaan não acompanha a turma. Sugiro que procurem outra escola."),
        ("father", "Mas diretor, deve haver alguma solução..."),
        ("narrator", "A escola descarta o aluno em vez de se adaptar.")
    ],
    "compare": [
        ("brother", "Tirei dez de novo!"),
        ("narrator", "E o Ishaan é cobrado o tempo todo pra ser igual ao irmão.")
    ],
    "father_anger": [
        ("father", "Você só quer saber de brincadeira! Não tem vergonha desse boletim?"),
        ("ishaan", "Eu... eu juro que tentei..."),
        ("narrator", "A frustração se transforma em barreira dentro de casa.")
    ],
    "farewell": [
        ("ishaan", "Mãe, por favor, não me deixa aqui... eu vou ser bonzinho!"),
        ("narrator", "A dor da separação e o sentimento de abandono.")
    ],
    "gate": [
        ("ishaan", "Eu só queria voltar pra casa..."),
        ("narrator", "No internato, o menino vai se fechando.")
    ],
    "strict_school": [
        ("strict", "Fique de pé! Como não consegue ler este texto simples?"),
        ("ishaan", "As letras... elas fogem..."),
        ("narrator", "A rigidez escolar pune a dificuldade com humilhação.")
    ],
    "rajan": [
        ("rajan", "Oi, eu sou o Rajan. Posso me sentar com você?"),
        ("ishaan", "Oi... pode sim."),
        ("narrator", "A empatia surge onde a exclusão reina.")
    ],
    "depression": [
        ("narrator", "Ishaan perde a vontade de desenhar. Ele se fecha num poço de silêncio."),
        ("ishaan", "Eu sou um peso para todo mundo...")
    ],
    "teacher": [
        ("nikumbh", "Cada criança aprende do seu jeito. Inclusive você."),
        ("narrator", "A chegada do professor muda tudo.")
    ],
    "bum_bum_bole": [
        ("nikumbh", "Bum Bum Bole! Vamos cantar, dançar e pintar a vida!"),
        ("narrator", "A alegria entra na sala de aula pela primeira vez.")
    ],
    "empty_notebook": [
        ("nikumbh", "Por que seu caderno está em branco, Ishaan? Não quer desenhar?"),
        ("narrator", "Nikumbh percebe o sofrimento invisível atrás do silêncio.")
    ],
    "parents_house": [
        ("nikumbh", "Olhem estes quadros! O Ishaan é um artista brilhante. Ele só precisa de tempo."),
        ("narrator", "O professor reconecta a escola com a realidade do aluno.")
    ],
    "father_meeting": [
        ("nikumbh", "Leia isso em japonês! Não consegue? É assim que o Ishaan se sente todo dia."),
        ("father", "Eu... eu não sabia..."),
        ("narrator", "Derrubando os preconceitos familiares.")
    ],
    "principal_office": [
        ("nikumbh", "Diretor, se o avaliarmos oralmente e dermos apoio, ele vai conseguir."),
        ("principal", "De acordo. Vamos dar uma chance ao menino."),
        ("narrator", "A gestão escolar se abre para a flexibilização curricular.")
    ],
    "tutoring": [
        ("nikumbh", "Vamos transformar as letras numa brincadeira."),
        ("ishaan", "Eu consegui... eu li!")
    ],
    "sand_writing": [
        ("nikumbh", "Sinta a forma da letra na areia, Ishaan. Desenhe devagar."),
        ("ishaan", "É como desenhar na praia... eu consigo!"),
        ("narrator", "A educação multissensorial garante o direito de aprender.")
    ],
    "cards": [
        ("nikumbh", "Einstein, Picasso, Leonardo da Vinci... todos eram disléxicos.")
    ],
    "easel": [
        ("ishaan", "Eu pintei isso!"),
        ("narrator", "E a escola, enfim, enxerga o que ele tem de melhor.")
    ],
    "paintings_reveal": [
        ("principal", "O vencedor do concurso de pintura é... Ishaan Awasthi!"),
        ("narrator", "A escola aplaude o talento que antes rejeitava.")
    ],
    "final_hug": [
        ("father", "Obrigado, professor. Você salvou meu filho."),
        ("ishaan", "Professor Nikumbh! Obrigado!"),
        ("nikumbh", "Voe alto, Ishaan! Voe alto!")
    ]
}

# ==============================================================================
# FUNÇÕES DE GERAÇÃO
# ==============================================================================

def generate_elevenlabs(text, voice_id, filepath):
    """Gera áudio usando a API da ElevenLabs."""
    if ELEVENLABS_API_KEY == "SUA_API_KEY_AQUI":
        raise ValueError("Chave de API da ElevenLabs não configurada.")
        
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }
    
    # Configurações para dar maior expressividade à voz
    # Podemos adicionar prompts emocionais no texto se usarmos modelos específicos,
    # mas o modelo Multilingual v2 lida muito bem com entonação direta.
    data = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.45,       # Menor estabilidade = voz mais expressiva e dinâmica
            "similarity_boost": 0.75, # Fidelidade à voz original
            "style": 0.15,            # Exagero do estilo nativo da voz
            "use_speaker_boost": True
        }
    }
    
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        with open(filepath, "wb") as f:
            f.write(response.content)
        return True
    else:
        print(f"Erro na ElevenLabs: {response.status_code} - {response.text}")
        return False

def generate_openai(text, voice_name, filepath):
    """Gera áudio usando a API de TTS da OpenAI."""
    if OPENAI_API_KEY == "SUA_API_KEY_AQUI":
        raise ValueError("Chave de API da OpenAI não configurada.")
        
    url = "https://api.openai.com/v1/audio/speech"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "tts-1-hd",  # tts-1-hd garante qualidade máxima (SOTA)
        "input": text,
        "voice": voice_name
    }
    
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        with open(filepath, "wb") as f:
            f.write(response.content)
        return True
    else:
        print(f"Erro na OpenAI: {response.status_code} - {response.text}")
        return False

# ==============================================================================
# EXECUÇÃO PRINCIPAL
# ==============================================================================

def main():
    # Cria o diretório de saída se não existir
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Salvando arquivos de áudio em: {OUTPUT_DIR}\n")
    
    # Valida chaves
    if PROVIDER == "elevenlabs" and ELEVENLABS_API_KEY == "SUA_API_KEY_AQUI":
        print("[AVISO] ElevenLabs selecionada, mas a chave de API não foi inserida.")
        print("Por favor, defina a variável ELEVENLABS_API_KEY ou insira-a no script.")
        return
    elif PROVIDER == "openai" and OPENAI_API_KEY == "SUA_API_KEY_AQUI":
        print("[AVISO] OpenAI selecionada, mas a chave de API não foi inserida.")
        print("Por favor, defina a variável OPENAI_API_KEY ou insira-a no script.")
        return

    success_count = 0
    fail_count = 0

    print(f"Iniciando a geração de áudio usando {PROVIDER.upper()}...\n")
    
    # Itera por todas as cenas
    for scene_key, lines in SCENES_DATA.items():
        print(f"Processando cena: {scene_key} ({len(lines)} falas)")
        
        for idx, (speaker, text) in enumerate(lines):
            # Limpa tags HTML simples caso existam no texto original (ex: <b>)
            clean_text = text.replace("<b>", "").replace("</b>", "").replace("<i>", "").replace("</i>", "")
            
            # Define o nome do arquivo de áudio seguindo o padrão
            filename = f"{scene_key}_{idx}_{speaker}.mp3"
            filepath = os.path.join(OUTPUT_DIR, filename)
            
            # Evita regerar caso o arquivo já exista
            if os.path.exists(filepath):
                print(f"  [Ignorado] {filename} já existe.")
                success_count += 1
                continue
            
            # Obtém a voz correta
            if PROVIDER == "elevenlabs":
                voice_id = ELEVENLABS_VOICES.get(speaker, ELEVENLABS_VOICES["narrator"])
            else:
                voice_id = OPENAI_VOICES.get(speaker, OPENAI_VOICES["narrator"])
            
            print(f"  -> Gerando fala {idx} ({speaker}): \"{clean_text[:40]}...\"")
            
            try:
                if PROVIDER == "elevenlabs":
                    success = generate_elevenlabs(clean_text, voice_id, filepath)
                else:
                    success = generate_openai(clean_text, voice_id, filepath)
                
                if success:
                    print(f"    [Sucesso] Salvo em {filename}")
                    success_count += 1
                else:
                    print(f"    [Falhou] Erro ao gerar {filename}")
                    fail_count += 1
            except Exception as e:
                print(f"    [Erro] Exceção ao gerar {filename}: {e}")
                fail_count += 1
                
        print("-" * 50)
        
    print(f"\nGeração concluída! Sucesso: {success_count} | Falhas: {fail_count}")

if __name__ == "__main__":
    main()
