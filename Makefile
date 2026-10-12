# Local builds run in Docker so they match the GitHub Pages legacy builder
# (github-pages gem, Jekyll 3.10). Gems are cached in a named volume.
IMAGE  := ruby:3.3
RUN    := docker run --rm -v "$(CURDIR)":/srv/site -v arcanag-bundle:/usr/local/bundle -w /srv/site
JEKYLL := bundle install --quiet && bundle exec jekyll

.PHONY: build serve proof

build:
	$(RUN) $(IMAGE) bash -c "$(JEKYLL) build"

serve:
	$(RUN) -p 4000:4000 $(IMAGE) bash -c "$(JEKYLL) serve --host 0.0.0.0 --livereload"

proof: build
	$(RUN) $(IMAGE) bash -c "bundle install --quiet && bundle exec htmlproofer ./_site --disable-external --ignore-files '/rahul-mahima-wedding/'"
