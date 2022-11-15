# Makefile

install:
	cp muggbackend.service /etc/systemd/system/
	systemctl daemon-reload
	systemctl enable muggbackend.service

uninstall:
	rm -rfv /etc/systemd/system/muggbackend.service
	systemctl daemon-reload
